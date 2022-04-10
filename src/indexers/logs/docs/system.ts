export const system = {
  '@timestamp': { generatorType: 'iso8601' },
  agent: {
    name: 'agent-1',
    id: '1a5127f9-7ac3-4843-a2cc-b8c90dc9dce7',
    ephemeral_id: 'ca295b95-b05c-4e9f-b736-2f0ae4312592',
    type: 'filebeat',
    version: '8.1.2',
  },
  process: {
    name: 'syslogd',
    pid: 126,
  },
  log: {
    file: {
      path: '/var/log/system.log',
    },
    offset: { generatorType: 'randomInt', params: { min: 1, max: 50 } },
  },
  fileset: {
    name: 'syslog',
  },
  message: { generatorType: 'dictionary', params: { value: 'word' } },
  input: {
    type: 'log',
  },
  system: {
    syslog: {},
  },
  ecs: {
    version: '1.12.0',
  },
  related: {
    hosts: ['host-1'],
  },
  service: {
    type: 'system',
  },
  host: {
    hostname: 'host-1',
    name: 'host-1',
    id: '1',
  },
  event: {
    ingested: { generatorType: 'iso8601' },
    timezone: '+02:00',
    kind: 'event',
    module: 'system',
    dataset: 'system.syslog',
  },
};
