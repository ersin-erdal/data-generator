import { MetricGeneratorConfig } from '../../generators/types';

const sineWave = (min: number, max: number, period: number) => ({
  generatorType: 'sineWave',
  params: {
    min,
    max,
    period,
  },
});

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
      nice: {
        pct: 0,
        norm: {
          pct: 0,
        },
      },
      cores: 16,
      total: {
        pct: sineWave(0, 1, 16),
        norm: {
          pct: sineWave(0, 1, 24),
        },
      },
      user: {
        norm: {
          pct: sineWave(0, 1, 24),
        },
        pct: sineWave(0, 1, 16),
      },
      system: {
        norm: {
          pct: sineWave(0, 0.2, 24),
        },
        pct: sineWave(0, 0.4, 24),
      },
      idle: {
        pct: sineWave(0, 1, 32),
        norm: {
          pct: sineWave(0, 1, 16),
        },
      },
    },
  },
};

export const config: MetricGeneratorConfig = {
  interval: 5000,
  version: '8.1.2',
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
