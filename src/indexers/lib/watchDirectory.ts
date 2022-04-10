import fs from 'fs';
import { Logger } from 'winston';

export const watchDirectory = ({
  directoryPath,
  callback,
  logger,
}: {
  logger: Logger;
  directoryPath: string;
  // eslint-disable-next-line no-unused-vars
  callback: (filename: string) => void;
}) => {
  fs.watch(directoryPath, (eventType, filename) => {
    if (eventType !== 'change') return;
    callback(filename);
    logger.info(`${filename} has changed`);
  });
};
