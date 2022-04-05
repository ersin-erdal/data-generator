import { Client } from '@elastic/elasticsearch';
import { Logger } from 'winston';
import { config } from './config';
import { generateData } from '../../generators/generateData';
import { Indexer } from '../../types';

export const customIndex: Indexer = ({
  client,
  logger,
}: {
  client: Client;
  logger: Logger;
}) => {
  const validateConfig = () => {
    if (config.interval < 1000) {
      throw new Error('Too low interval');
    }
  };

  validateConfig();

  const generateDoc = () => {
    const data: { [key: string]: any } = {};

    Object.entries(config.doc).forEach(([key, value]) => {
      data[key] = generateData({
        type: value.type,
        params: value.params,
      });
    });

    return data;
  };

  let numberOfFailures = 0;

  const index = async () => {
    try {
      const document = generateDoc();
      await client.index({
        index: config.indexName,
        document,
      });
      numberOfFailures = 0;
      logger.info(`Doc indexed: ${JSON.stringify(document)}`);
      setTimeout(index, config.interval);
    } catch (e) {
      numberOfFailures += 1;
      logger.error(`Failure (${numberOfFailures})`);
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
