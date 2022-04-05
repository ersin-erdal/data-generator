// iso8601 ###################################################
export interface IsoGeneratorParams {
  date: string;
}

interface IsoGeneratorConfig {
  type: 'iso8601';
  params?: IsoGeneratorParams;
}

// uuid #########################################################
interface UuidGeneratorConfig {
  type: 'uuid';
  params?: never;
}

// randomInt ###################################################
export interface RandomIntGeneratorParams {
  min: number;
  max: number;
}
interface RandomIntGeneratorConfig {
  type: 'randomInt';
  params: RandomIntGeneratorParams;
}

// randomFloat #################################################
export interface RandomFloatGeneratorParams {
  max: number;
  min: number;
}
interface RandomFloatGeneratorConfig {
  type: 'randomFloat';
  params: RandomFloatGeneratorParams;
}

// dictionary ####################################################
export interface DictionaryGeneratorParams {
  value: 'names' | 'word';
}
interface DictionaryGeneratorConfig {
  type: 'dictionary';
  params: DictionaryGeneratorParams;
}

// fixed ##########################################################
export interface FixedValueGeneratorParams {
  value: string | number;
}
interface FixedValueGeneratorConfig {
  type: 'fixed';
  params: FixedValueGeneratorParams;
}

// ################################################################

export type GeneratorTypes =
  | 'dictionary'
  | 'uuid'
  | 'iso8601'
  | 'fixed'
  | 'randomInt'
  | 'randomFloat';

export type GeneratorParams =
  | IsoGeneratorParams
  | RandomIntGeneratorParams
  | RandomFloatGeneratorParams
  | DictionaryGeneratorParams
  | FixedValueGeneratorParams;

export interface CustomIndexGeneratorConfig {
  interval: number;
  version: string;
  indexName: string;
  doc: {
    [key: string]:
      | IsoGeneratorConfig
      | FixedValueGeneratorConfig
      | UuidGeneratorConfig
      | RandomIntGeneratorConfig
      | RandomFloatGeneratorConfig
      | DictionaryGeneratorConfig;
  };
}
