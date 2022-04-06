import {
  dictionary,
  iso8601,
  randomFloat,
  randomInt,
  uuid,
  sineWave,
} from './index';
import {
  GeneratorTypes,
  IsoGeneratorParams,
  RandomIntGeneratorParams,
  RandomFloatGeneratorParams,
  DictionaryGeneratorParams,
  GeneratorParams,
  SineWaveGeneratorParams,
} from './types';

const invalidType = (gen: string): never => {
  throw new Error(`Invalid generator type: ${gen}`);
};

export const generateData = ({
  generatorType,
  params,
}: {
  generatorType: GeneratorTypes;
  params?: GeneratorParams;
}) => {
  switch (generatorType) {
    case 'iso8601':
      return iso8601(params as IsoGeneratorParams);
    case 'randomInt':
      return randomInt(params as RandomIntGeneratorParams);
    case 'randomFloat':
      return randomFloat(params as RandomFloatGeneratorParams);
    case 'dictionary':
      return dictionary(params as DictionaryGeneratorParams);
    case 'uuid':
      return uuid();
    case 'sineWave':
      return sineWave(params as SineWaveGeneratorParams);
    default:
      return invalidType(generatorType);
  }
};
