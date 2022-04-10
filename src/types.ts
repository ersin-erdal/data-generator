import { Client } from '@elastic/elasticsearch';
import { Logger } from 'winston';
import { Doc } from './generators/types';

/* eslint-disable no-unused-vars */
export type Indexer = (params: { client: Client; logger: Logger }) => {
  index: () => void;
};

export interface DataStore {
  sineWave: { [id: string]: { index: number; current: number } };
  increment: { [id: string]: { lastValue: number } };
  customIndexerDocs: { [id: string]: Doc };
  metricsDocs: { [id: string]: Doc };
}
