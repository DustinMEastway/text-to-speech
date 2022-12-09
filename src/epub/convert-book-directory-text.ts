import { noop } from '../lib/core/utility';
import { readDirectory } from '../lib/node/file-system';
import { convertBookText } from './convert-book-text';
import { Book, BookStatus } from './types';

export interface ConvertBookDirectoryTextProps {
  inputPath: string;
  onBookStatusChange?: (book: Book) => void;
  outputPath: string;
}

export async function convertBookDirectoryText({
  inputPath,
  onBookStatusChange = noop,
  outputPath
}: ConvertBookDirectoryTextProps): Promise<void> {
  const books = (await readDirectory({
    path: inputPath
  })).map(({ name }) => {
    return {
      name,
      status: BookStatus.queued
    };
  });

  books.forEach(onBookStatusChange);

  await Promise.all(
    books.map((book) => {
      return convertBookText({
        book,
        inputPath: `${inputPath}/${book.name}`,
        outputPath: `${outputPath}/${book.name}`,
        onBookStatusChange
      });
    })
  );
}
