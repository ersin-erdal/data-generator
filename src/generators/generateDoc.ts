import { isObject } from 'lodash';
import { Doc } from './types';
import { generateData } from './generateData';

export const generateDoc = (doc: Doc) => {
  const newDoc = JSON.parse(JSON.stringify(doc));
  const generateValues = (obj: any) => {
    Object.keys(obj).forEach((key) => {
      if (obj[key].generatorType) {
        // eslint-disable-next-line no-param-reassign
        obj[key] = generateData({
          generatorType: obj[key].generatorType,
          params: obj[key].params,
        });
      } else if (isObject(obj[key])) {
        generateValues(obj[key]);
      }
    });
  };

  generateValues(newDoc);
  return newDoc;
};
