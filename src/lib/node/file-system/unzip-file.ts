// import { createReadStream } from 'fs';
import { dirname } from 'path';
import { default as Zipper } from 'adm-zip';

export interface UnzipFileParams {
  /** Path to the directory that should be unzipped into. */
  outPath?: string;
  /** Path to the file to unzip. */
  path: string;
}

/** Unzip a file. */
export function unzipFile({
  outPath,
  path
}: UnzipFileParams): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    outPath ??= dirname(path);

    const zipper = new Zipper(path);
    console.log(path, outPath);
    zipper.extractAllToAsync(outPath, true, true, (error) => {
      if (error) {
        reject(error);
      }

      resolve();
    });
  });
}
