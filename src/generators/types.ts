// iso8601 ###################################################
export interface IsoGeneratorParams {
  date: string;
}

// randomInt ###################################################
export interface RandomIntGeneratorParams {
  min: number;
  max: number;
}

// randomFloat #################################################
export interface RandomFloatGeneratorParams {
  max: number;
  min: number;
}

// dictionary ####################################################
export interface DictionaryGeneratorParams {
  value: 'names' | 'word';
}

// sineWave ##########################################################
export interface SineWaveGeneratorParams {
  max: number;
  min: number;
  period: number;
}

// ################################################################

export type GeneratorTypes =
  | 'dictionary'
  | 'uuid'
  | 'iso8601'
  | 'randomInt'
  | 'randomFloat'
  | 'sineWave';

export type GeneratorParams =
  | IsoGeneratorParams
  | RandomIntGeneratorParams
  | RandomFloatGeneratorParams
  | DictionaryGeneratorParams
  | SineWaveGeneratorParams;

export interface Doc {
  [key: string]: unknown;
}

export interface CustomIndexGeneratorConfig {
  interval: number;
  indexName: string;
  doc: Doc;
}

export interface MetricGeneratorConfig {
  interval: number;
  version: string;
  hosts: Array<{
    id: string;
    doc: Doc;
  }>;
}

export interface DataStore {
  sineWave: { [id: string]: { index: number; current: number } };
}