import { Client } from '@elastic/elasticsearch';
import { Logger } from 'winston';
import { isEmpty } from 'lodash';
import { config } from './config';
import { Indexer } from '../../types';
import { validateConfig } from './validateConfig';
import { dataStore } from '../../dataStore';
import { indexDoc, loadDoc } from '../lib';
import { watchDirectory } from '../lib/watchDirectory';

export const customIndex: Indexer = ({
  client,
  logger,
}: {
  client: Client;
  logger: Logger;
}) => {
  validateConfig(config);

  const directoryPath = './src/indexers/custom-index/docs';
  let numberOfFailures = 0;

  const index = async () => {
    if (isEmpty(dataStore.customIndexerDocs)) {
      config.docs.forEach((filename) => {
        dataStore.customIndexerDocs[filename] = loadDoc({
          filename,
          directoryPath,
        });
      });
      watchDirectory({
        directoryPath,
        logger,
        callback: (filename) => {
          dataStore.customIndexerDocs[filename] = loadDoc({
            filename,
            directoryPath,
          });
        },
      });
    }

    const results = await Promise.allSettled(
      Object.values(dataStore.customIndexerDocs).map((doc) =>
        indexDoc({
          client,
          logger,
          doc,
          index: config.indexName,
        })
      )
    );

    const hasFailingClient = results.some(
      (result) => result.status === 'rejected'
    );
    if (hasFailingClient) {
      numberOfFailures += 1;
    }

    if (numberOfFailures >= 5) {
      throw new Error('Failing Client');
    } else {
      setTimeout(index, config.interval);
    }
  };

  return {
    index,
  };
};
