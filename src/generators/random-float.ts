import { RandomFloatGeneratorParams } from './types';

export const randomFloat = ({ max, min }: RandomFloatGeneratorParams) =>
  Math.round((Math.random() * (max - min + 1) + min) * 100) / 100;
