import { parseString } from 'xml2js';

export interface ParseXmlProps {
  input: string;
}

export function parseXml({
  input
}: ParseXmlProps): Promise<unknown> {
  return new Promise((resolve, reject) => {
    parseString(input, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}
