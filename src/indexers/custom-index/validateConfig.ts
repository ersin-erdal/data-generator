import { CustomIndexGeneratorConfig } from '../../generators/types';

export const validateConfig = (config: CustomIndexGeneratorConfig) => {
  if (config.interval < 1000) {
    throw new Error('Too low interval');
  }
};
