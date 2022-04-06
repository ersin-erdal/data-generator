import { set } from 'lodash';
import { dataStore } from './dataStore';

function rounder(value: number) {
  return parseFloat(value.toFixed(4));
}

export const sineWave = ({
  min,
  max,
  period,
}: {
  min: number;
  max: number;
  period: number;
}): number => {
  const id = `${min}${max}${period}`;
  const mid = rounder((max + min) / 2);
  const height = rounder((max - min) / 2);
  const index = dataStore.sineWave[id]?.index || 0;
  const x = (Math.PI * 2 * index) / period;
  const y = Math.sin(x);
  const current = rounder(y * height + mid);
  const newIndex = index + 1;

  set(dataStore, `sineWave[${id}].current`, current);
  set(dataStore, `sineWave[${id}].index`, newIndex >= period ? 0 : newIndex);

  return current;
};
