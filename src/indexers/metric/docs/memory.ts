import { sineWaveConfig } from '../../../generators';

export const memory = {
  '@timestamp': { generatorType: 'iso8601' },
  host: {
    id: '1',
    name: 'host-1',
    cpu: {
      usage: { generatorType: 'randomFloat', params: { min: 0, max: 1 } },
    },
  },
  event: {
    dataset: 'system.memory',
    module: 'system',
  },
  metricset: {
    period: 10000,
    name: 'memory',
  },
  service: {
    type: 'system',
  },
  system: {
    memory: {
      free: sineWaveConfig(9999999900, 10000000000, 16),
      actual: {
        free: 43405434880,
        used: {
          pct: sineWaveConfig(0.1, 0.2, 8),
          bytes: 25314041856,
        },
      },
      swap: {
        total: 1073741824,
        used: {
          pct: sineWaveConfig(0.1, 0.2, 16),
          bytes: 99090432,
        },
        free: 974651392,
      },
      total: 68719476736,
      used: {
        pct: sineWaveConfig(0.1, 0.2, 12),
        bytes: 42695720960,
      },
    },
  },
};
