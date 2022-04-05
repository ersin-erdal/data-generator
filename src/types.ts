import { Client } from '@elastic/elasticsearch';
import { Logger } from 'winston';

/* eslint-disable no-unused-vars */
export type Indexer = (params: { client: Client; logger: Logger }) => {
  index: () => void;
};
