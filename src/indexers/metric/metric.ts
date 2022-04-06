import { Client } from '@elastic/elasticsearch';
import { Logger } from 'winston';
import { Indexer } from '../../types';
import { config } from './config';
import { validateConfig } from './validateConfig';
import { generateDoc } from '../../generators/generateDoc';
import { Doc } from '../../generators/types';

export const metric: Indexer = ({
  client,
  logger,
}: {
  client: Client;
  logger: Logger;
}) => {
  validateConfig(config);

  let numberOfFailures = 0;

  const indexADoc = async (doc: Doc) => {
    const document = generateDoc(doc);
    await client.index({
      index: `metricbeat-${config.version}`,
      document,
    });
    logger.info(`Doc indexed: ${JSON.stringify(document)}`);
  };

  const index = async () => {
    const { hosts } = config;

    const results = await Promise.allSettled(
      hosts.map((host) => indexADoc(host.doc))
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
