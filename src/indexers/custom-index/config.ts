import { CustomIndexGeneratorConfig } from '../../generators/types';

export const config: CustomIndexGeneratorConfig = {
  interval: 5000,
  version: '8.1.3',
  indexName: 'test-index-8.1.3',
  doc: {
    '@timestamp': { type: 'iso8601' },
    name: { type: 'fixed', params: { value: 'test-doc' } },
    id: { type: 'uuid' },
    data_number: { type: 'randomInt', params: { min: 1, max: 5 } },
    data_float: { type: 'randomFloat', params: { min: 1, max: 5 } },
    data_string: { type: 'dictionary', params: { value: 'word' } },
  },
};
