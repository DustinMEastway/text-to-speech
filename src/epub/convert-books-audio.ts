import { runParallel } from '@brass-raven/core/async';
import { environment } from '../environment';
import { noop } from '../lib/core/utility';
import { convertBookAudio } from './convert-book-audio';
import { Book } from './types';

export interface ConvertBooksAudioProps {
  books: Map<string, Book>;
  inputPath: string;
  onBookStatusChange?: (book: Book) => void;
  outputPath: string;
}

/** Convert txt files into audio files for multiple books. */
export async function convertBooksAudio({
  books,
  inputPath,
  onBookStatusChange = noop,
  outputPath
}: ConvertBooksAudioProps): Promise<void> {
  await runParallel([...books], ([, book]) => {
    return convertBookAudio({
      book,
      inputPath: `${inputPath}/${book.name}`,
      onBookStatusChange,
      outputPath: `${outputPath}/${book.name}`
    });
  }, { batchSize: environment.batchSize.bookAudio });
}
