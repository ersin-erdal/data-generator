import { CustomIndexGeneratorConfig } from '../../generators/types';

export const config: CustomIndexGeneratorConfig = {
  interval: 1000,
  indexName: 'test-index-8.1.3',
  doc: {
    '@timestamp': { generatorType: 'iso8601' },
    name: 'test-doc',
    id: { generatorType: 'uuid' },
    data_number: { generatorType: 'randomInt', params: { min: 1, max: 5 } },
    data_float: { generatorType: 'randomFloat', params: { min: 1, max: 5 } },
    data_string: { generatorType: 'dictionary', params: { value: 'word' } },
    data_nested: {
      cpu: {
        usage: { generatorType: 'randomFloat', params: { min: 1, max: 5 } },
      },
    },
    data_wave: {
      generatorType: 'sineWave',
      params: {
        min: 0,
        max: 8,
        period: 16,
      },
    },
  },
};
