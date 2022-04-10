import { cloneDeepWith } from 'lodash';
import { MetricGeneratorConfig } from '../../generators/types';
import { cpu, memory } from './docs';

function customizer(val: string, key: any) {
  if (key === 'name' && val === 'host-1') {
    return 'host-2';
  }
  return undefined;
}

export const config: MetricGeneratorConfig = {
  interval: 10000,
  docs: [
    cpu,
    cloneDeepWith(cpu, customizer),
    memory,
    cloneDeepWith(memory, customizer),
  ],
};