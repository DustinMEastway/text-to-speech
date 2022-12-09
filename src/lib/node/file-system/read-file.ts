import { readFile as nodeReadFile } from 'fs/promises';

export interface ReadFileProps {
  path: string;
}

/** Reads a text file and returns it as a string. */
export async function readFile({
  path
}: ReadFileProps): Promise<string> {
  return (await nodeReadFile(path)).toString();
}
