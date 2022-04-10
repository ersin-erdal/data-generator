import { Client } from '@elastic/elasticsearch';
import { Logger } from 'winston';
import { isEmpty } from 'lodash';
import { validateConfig } from './validateConfig';
import { config } from './config';
import { dataStore } from '../../dataStore';
import { loadDocs } from '../lib/loadDocs';
import { watchDirectory } from '../lib/watchDirectory';
import { indexDoc, loadDoc } from '../lib';

export const logs = ({
  client,
  logger,
}: {
  client: Client;
  logger: Logger;
}) => {
  validateConfig(config);

  const directoryPath = './src/indexers/logs/docs';
  let numberOfFailures = 0;

  const index = async () => {
    if (isEmpty(dataStore.logsDocs)) {
      loadDocs({
        docs: config.docs,
        directoryPath,
        store: 'logsDocs',
      });
      watchDirectory({
        directoryPath,
        logger,
        callback: (filename) => {
          dataStore.logsDocs[filename] = loadDoc({
            filename,
            directoryPath,
          });
        },
      });
    }

    const results = await Promise.allSettled(
      Object.values(dataStore.logsDocs).map((doc) =>
        indexDoc({
          client,
          logger,
          doc,
          index: `filebeat-${process.env.FILEBEAT_VERSION}`,
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
