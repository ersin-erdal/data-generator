import { Client } from '@elastic/elasticsearch';
import { Logger } from 'winston';
import { validateConfig } from './validateConfig';
import { config } from './config';
import { generateDoc } from '../../generators/generateDoc';

export const logs = ({
  client,
  logger,
}: {
  client: Client;
  logger: Logger;
}) => {
  validateConfig(config);

  let numberOfFailures = 0;

  const index = async () => {
    try {
      const document = generateDoc(config.doc);
      await client.index({
        index: `filebeat-${process.env.FILEBEAT_VERSION}`,
        document,
      });
      numberOfFailures = 0;
      logger.info(`Doc indexed: ${JSON.stringify(document)}`);
      setTimeout(index, config.interval);
    } catch (e) {
      numberOfFailures += 1;
      logger.error(`Failure (${numberOfFailures})`);
      logger.info(JSON.stringify(e));
      if (numberOfFailures >= 5) {
        throw new Error('Failing Client');
      } else {
        setTimeout(index, config.interval);
      }
    }
  };

  return {
    index,
  };
};
