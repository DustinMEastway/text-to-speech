import { Stats } from 'fs';
import { lstat } from 'fs/promises';

export interface ListStatsProps {
  /** Path to get the stats from. */
  path: string;
}

/** Gets stats associated with a filesystem item. */
export async function listStats({
  path
}: ListStatsProps): Promise<Stats | null> {
  try {
    return await lstat(path);
  } catch {
    return null;
  }
}
