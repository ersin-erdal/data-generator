import { Client } from '@elastic/elasticsearch';
import { Logger } from 'winston';
import { Doc } from '../../generators/types';
import { generateDoc } from '../../generators/generateDoc';
import { resetConstantRandomInt } from '../../generators/constant-random-int';

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
  try {
    await client.index({
      index,
      document,
    });
    resetConstantRandomInt();
    logger.info(`Doc indexed: ${JSON.stringify(document)}`);
  } catch (e) {
    logger.error(`Indexing the Doc: ${JSON.stringify(document)} failed`);
  }
};
