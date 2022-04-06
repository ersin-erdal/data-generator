import { MetricGeneratorConfig } from '../../generators/types';

const doc = {
  '@timestamp': { generatorType: 'iso8601' },
  host: {
    id: '1',
    name: 'host-1',
    cpu: {
      usage: { generatorType: 'randomFloat', params: { min: 0, max: 1 } },
    },
  },
  event: {
    dataset: 'system.cpu',
    module: 'system',
  },
  metricset: {
    period: 10000,
    name: 'cpu',
  },
  service: {
    type: 'system',
  },
  system: {
    cpu: {
      total: {
        pct: {
          generatorType: 'sineWave',
          params: {
            min: 0,
            max: 1,
            period: 16,
          },
        },
        norm: {
          generatorType: 'sineWave',
          params: {
            min: 0,
            max: 8,
            period: 32,
          },
        },
      },
    },
  },
};

export const config: MetricGeneratorConfig = {
  interval: 1000,
  version: '8.1.3',
  hosts: [
    {
      id: '1',
      doc,
    },
    {
      id: '2',
      doc: { ...doc, host: { ...doc.host, id: 2, name: 'host-2' } },
    },
  ],
};
