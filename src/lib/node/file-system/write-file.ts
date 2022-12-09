import { writeFile as nodeWriteFile } from 'fs/promises';

export interface WriteFileProps {
  content: string;
  path: string;
}

/** Writes text to a file. */
export async function writeFile({
  content,
  path
}: WriteFileProps): Promise<void> {
  await nodeWriteFile(path, content);
}
