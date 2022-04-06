import { cloneDeepWith } from 'lodash';
import { MetricGeneratorConfig } from '../../generators/types';
import { cpu, memory } from './docs';

function customizer(val: string, key: any) {
  if (key === 'name' && val === 'host-1') {
    return 'host-2';
  }
  if (key === 'id') {
    return '2';
  }
  return undefined;
}

export const config: MetricGeneratorConfig = {
  interval: 5000,
  version: '8.1.2',
  docs: [
    cpu,
    memory,
    cloneDeepWith(cpu, customizer),
    cloneDeepWith(memory, customizer),
  ],
};
