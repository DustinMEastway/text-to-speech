import { runParallel } from '@brass-raven/core/async';
import { PathLike, Stats } from 'fs';
import { readdir } from 'fs/promises';
import { listStats } from './list-stats';

export interface DirectoryItem {
  name: string;
  stats: Stats | null;
}

export interface ReadDirectoryProps {
  /** Whether hidden item should be included in the results (default: false). */
  includeHidden?: boolean;
  /** Path to the directory to read. */
  path: PathLike;
}

/** Reads the contents of a directory. */
export async function readDirectory({
  includeHidden = false,
  path
}: ReadDirectoryProps): Promise<DirectoryItem[]> {
  const itemPromises = (await readdir(path)).filter((item) => {
    return includeHidden || item[0] !== '.';
  });

  return await runParallel(itemPromises, async (item) => {
    return {
      name: item,
      stats: await listStats({ path: `${path}/${item}` })
    };
  });
}
