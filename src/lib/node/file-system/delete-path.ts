import { rm } from 'fs/promises';

export interface DeletePathProps {
  /** Path to delete. */
  path: string;
}

/** Delete a filesystem item. */
export async function deletePath({
  path
}: DeletePathProps): Promise<void> {
  return await rm(path, { recursive: true });
}
