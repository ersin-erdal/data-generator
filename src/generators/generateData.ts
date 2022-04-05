import {
  dictionary,
  iso8601,
  randomFloat,
  randomInt,
  fixed,
  uuid,
  sineWave,
} from './index';
import {
  GeneratorTypes,
  IsoGeneratorParams,
  RandomIntGeneratorParams,
  RandomFloatGeneratorParams,
  DictionaryGeneratorParams,
  FixedValueGeneratorParams,
  GeneratorParams,
  SineWaveGeneratorParams,
} from './types';

const invalidType = (x: string): never => {
  throw new Error(`Invalid dictionary type: ${x}`);
};

export const generateData = ({
  type,
  params,
}: {
  type: GeneratorTypes;
  params?: GeneratorParams;
}) => {
  switch (type) {
    case 'iso8601':
      return iso8601(params as IsoGeneratorParams);
    case 'randomInt':
      return randomInt(params as RandomIntGeneratorParams);
    case 'randomFloat':
      return randomFloat(params as RandomFloatGeneratorParams);
    case 'dictionary':
      return dictionary(params as DictionaryGeneratorParams);
    case 'fixed':
      return fixed(params as FixedValueGeneratorParams);
    case 'uuid':
      return uuid();
    case 'sineWave':
      return sineWave(params as SineWaveGeneratorParams);
    default:
      return invalidType(type);
  }
};
