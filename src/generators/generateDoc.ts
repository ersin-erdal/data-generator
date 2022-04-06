import { isObject } from 'lodash';
import { Doc } from './types';
import { generateData } from './generateData';

export const generateDoc = (doc: Doc) => {
  const newDoc = { ...doc };

  const generateValues = (obj: any) => {
    Object.entries(obj).forEach(([key, value]: [key: any, value: any]) => {
      if (value.generatorType) {
        // eslint-disable-next-line no-param-reassign
        obj[key] = generateData({
          generatorType: value.generatorType,
          params: value.params,
        });
      } else if (isObject(value)) {
        generateValues(value);
      }
    });
  };

  generateValues(newDoc);
  return newDoc;
};
