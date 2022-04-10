import { Client } from '@elastic/elasticsearch';
import { Logger } from 'winston';
import { Doc } from '../../generators/types';
import { generateDoc } from '../../generators/generateDoc';

export const indexDoc = async ({
  client,
  logger,
  doc,
  index,
}: {
  client: Client;
  logger: Logger;
  doc: Doc;
  index: string;
}) => {
  const document = generateDoc(doc);
  await client.index({
    index,
    document,
  });
  logger.info(`Doc indexed: ${JSON.stringify(document)}`);
};
