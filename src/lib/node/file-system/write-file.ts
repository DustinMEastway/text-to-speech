import { writeFile as nodeWriteFile } from 'fs/promises';

export interface WriteFileProps {
  /** Text content to write to the file. */
  content: string;
  /** Path of the file to write content to. */
  path: string;
}

/** Writes text to a file. */
export async function writeFile({
  content,
  path
}: WriteFileProps): Promise<void> {
  await nodeWriteFile(path, content);
}
