import { sineWaveConfig } from '../../../generators';

export const cpu = {
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
        pct: sineWaveConfig(0, 1, 16),
        norm: {
          pct: sineWaveConfig(0, 1, 32),
        },
      },
      user: {
        norm: {
          pct: sineWaveConfig(0, 1, 32),
        },
        pct: sineWaveConfig(0, 1, 16),
      },
      system: {
        norm: {
          pct: sineWaveConfig(0, 1, 32),
        },
        pct: sineWaveConfig(0, 1, 16),
      },
      idle: {
        pct: sineWaveConfig(0, 1, 32),
        norm: {
          pct: sineWaveConfig(0, 1, 16),
        },
      },
    },
  },
};
