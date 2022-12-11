import { rename } from 'fs/promises';
import { dirname } from 'path';
import { makeDirectory } from './make-directory';

export interface MovePathProps {
  /** Source path to move to a new location. */
  source: string;
  /** Target path to move the source to. */
  target: string;
}

/** Move a directory/file to a new location. */
export async function movePath({
  source,
  target
}: MovePathProps): Promise<void> {
  await makeDirectory({ path: dirname(target) });
  await rename(source, target);
}
