import { LogGeneratorConfig } from '../../generators/types';

export const validateConfig = (config: LogGeneratorConfig) => {
  if (config.interval < 1000) {
    throw new Error('Too low interval');
  }
};
