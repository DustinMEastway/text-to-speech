import { runParallel } from '@brass-raven/core/async';
import { environment } from '../environment';
import { noop } from '../lib/core/utility';
import { convertBookText } from './convert-book-text';
import { Book } from './types';

export interface ConvertBooksTextProps {
  books: Map<string, Book>;
  inputPath: string;
  onBookStatusChange?: (book: Book) => void;
  outputPath: string;
}

/** Convert multiple books into txt files. */
export async function convertBooksText({
  books,
  inputPath,
  onBookStatusChange = noop,
  outputPath
}: ConvertBooksTextProps): Promise<void> {
  await runParallel([...books], ([, book]) => {
    return convertBookText({
      book,
      inputPath: `${inputPath}/${book.name}`,
      onBookStatusChange,
      outputPath: `${outputPath}/${book.name}`
    });
  }, { batchSize: environment.batchSize.bookText });
}
