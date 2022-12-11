import { parseString } from 'xml2js';

export interface ParseXmlProps {
  /** XML string to parse. */
  input: string;
}

/** Parse the provided text into a JS object similar to `JSON.parse`. */
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
