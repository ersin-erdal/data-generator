import { set, isUndefined } from 'lodash';
import { dataStore } from '../dataStore';

export const increment = ({
  start = 0,
  incrementBy,
  id,
}: {
  start: number;
  incrementBy: number;
  id: number;
}): number => {
  const lastValue = dataStore.increment[id]?.lastValue;
  const value = isUndefined(lastValue) ? start : lastValue + incrementBy;
  set(dataStore, `increment[${id}].lastValue`, value);

  return value;
};
