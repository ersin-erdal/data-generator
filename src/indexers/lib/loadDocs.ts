import { dataStore } from '../../dataStore';
import { loadDoc } from './loadDoc';

export const loadDocs = ({
  docs,
  directoryPath,
  store,
}: {
  docs: string[];
  directoryPath: string;
  store: keyof typeof dataStore;
}): void => {
  docs.forEach((filename) => {
    dataStore[store][filename] = loadDoc({
      filename,
      directoryPath,
    });
  });
};
