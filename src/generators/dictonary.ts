import { DictionaryGeneratorParams } from './types';
import { Dictionaries } from './dictionaries/types';

const wordDictionary = require('./dictionaries/word.json');
const namesDictionary = require('./dictionaries/names.json');

const dictionaries: Dictionaries = {
  word: wordDictionary,
  names: namesDictionary,
};

export const dictionary = ({ value }: DictionaryGeneratorParams): string => {
  const selectedDictionary = dictionaries[value] || dictionaries.word;
  const index = Math.floor(Math.random() * selectedDictionary.length);
  return selectedDictionary[index];
};
