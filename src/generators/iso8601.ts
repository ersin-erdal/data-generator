import { IsoGeneratorParams } from './types';

export const iso8601 = (params?: IsoGeneratorParams): string => {
  const dateTime = params?.date ? new Date(params.date) : new Date();
  return dateTime.toISOString();
};
