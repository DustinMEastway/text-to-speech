import { runParallel } from '@brass-raven/core/async';
import {
  movePath,
  readDirectory,
  unzipFile
} from '../lib/node/file-system';

export interface UnzipBookDirectoryProps {
  /** Path to the directory with book files in it. */
  path: string;
}

/** Unzip all books in the provided directory @see path. */
export async function unzipBookDirectory({
  path
}: UnzipBookDirectoryProps): Promise<void> {
  const inputPathItems = await readDirectory({ path });
  const epubPaths = inputPathItems.filter(({ name, stats }) => {
    return name.endsWith('.epub') && stats?.isFile();
  });

  await runParallel(epubPaths, async ({ name }) => {
    const oldBookPath = `${path}/${name}`;
    const newBookPath = `${path}/${name.replace(/\.epub$/, '')}/${name}`;
    await movePath({
      source: oldBookPath,
      target: newBookPath
    });

    await unzipFile({ path: newBookPath });
  });
}
