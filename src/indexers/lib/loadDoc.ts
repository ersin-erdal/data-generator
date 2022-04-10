import fs from 'fs';
import { Doc } from '../../generators/types';

export const loadDoc = ({
  filename,
  directoryPath,
}: {
  filename: string;
  directoryPath: string;
}): Doc =>
  JSON.parse(
    fs.readFileSync(`${directoryPath}/${filename}`, {
      encoding: 'utf8',
    })
  );
