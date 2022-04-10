import { Client } from '@elastic/elasticsearch';
import { Logger } from 'winston';
import { isEmpty } from 'lodash';
import { Indexer } from '../../types';
import { config } from './config';
import { validateConfig } from './validateConfig';
import { indexDoc, loadDoc } from '../lib';
import { dataStore } from '../../dataStore';
import { loadDocs } from '../lib/loadDocs';
import { watchDirectory } from '../lib/watchDirectory';

export const metrics: Indexer = ({
  client,
  logger,
}: {
  client: Client;
  logger: Logger;
}) => {
  validateConfig(config);

  const directoryPath = './src/indexers/metrics/docs';
  let numberOfFailures = 0;

  const index = async () => {
    if (isEmpty(dataStore.metricsDocs)) {
      loadDocs({
        docs: config.docs,
        directoryPath,
        store: 'metricsDocs',
      });
      watchDirectory({
        directoryPath,
        logger,
        callback: (filename) => {
          dataStore.metricsDocs[filename] = loadDoc({
            filename,
            directoryPath,
          });
        },
      });
    }

    const results = await Promise.allSettled(
      Object.values(dataStore.metricsDocs).map((doc) =>
        indexDoc({
          client,
          logger,
          doc,
          index: `metricbeat-${process.env.METRICBEAT_VERSION}`,
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
      logger.error(results);
      throw new Error('Failing Client');
    } else {
      setTimeout(index, config.interval);
    }
  };

  return {
    index,
  };
};
