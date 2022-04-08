import { MetricGeneratorConfig } from '../../generators/types';

export const validateConfig = (config: MetricGeneratorConfig) => {
  if (config.interval < 1000) {
    throw new Error('Too low interval');
  }
};
