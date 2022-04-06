import { Client } from '@elastic/elasticsearch';
import winston from 'winston';
import { customIndex } from './indexers/custom-index';
import { metric } from './indexers/metric';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

const client = new Client({
  node: 'http://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'changeme',
  },
});

const invalidIndexer = (ind?: string): never => {
  throw new Error(`Invalid indexer: ${ind}`);
};

const indexer = process.env.INDEXER;

switch (indexer) {
  case 'custom-index':
    customIndex({ client, logger }).index();
    break;
  case 'metric':
    metric({ client, logger }).index();
    break;
  default:
    invalidIndexer(indexer);
}