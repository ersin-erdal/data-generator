import { dataStore } from '../dataStore';

export const constantRandomInt = ({
  min,
  max,
  name,
}: {
  min: number;
  max: number;
  name: string;
}): number => {
  if (!dataStore.constantRandomInt[name]) {
    dataStore.constantRandomInt[name] = Math.floor(
      Math.random() * (max - min + 1) + min
    );
  }

  return dataStore.constantRandomInt[name];
};

export const resetConstantRandomInt = () => {
  dataStore.constantRandomInt = {};
};
