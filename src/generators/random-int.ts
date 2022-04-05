import { RandomIntGeneratorParams } from './types';

export const randomInt = ({ min, max }: RandomIntGeneratorParams) =>
  Math.floor(Math.random() * (max - min + 1) + min);
