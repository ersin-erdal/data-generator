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

// increment ##########################################################
export interface IncrementGeneratorParams {
  start: number;
  incrementBy: number;
  id: number;
}

// ################################################################

export type GeneratorTypes =
  | 'dictionary'
  | 'uuid'
  | 'iso8601'
  | 'randomInt'
  | 'randomFloat'
  | 'increment'
  | 'sineWave';

export type GeneratorParams =
  | IsoGeneratorParams
  | RandomIntGeneratorParams
  | RandomFloatGeneratorParams
  | DictionaryGeneratorParams
  | IncrementGeneratorParams
  | SineWaveGeneratorParams;

export interface Doc {
  [key: string]: unknown;
}

export interface LogGeneratorConfig {
  interval: number;
  doc: Doc;
}

export interface CustomIndexGeneratorConfig {
  interval: number;
  indexName: string;
  docs: string[];
}

export interface MetricGeneratorConfig {
  interval: number;
  docs: string[];
}
