import { PathLike } from 'fs';
import { mkdir } from 'fs/promises';

export interface MakeDirectoryProps {
  /** Path to the directory to create. */
  path: PathLike;
}

/** Makes a directory. */
export async function makeDirectory({
  path
}: MakeDirectoryProps): Promise<void> {
  await mkdir(path, { recursive: true });
}
