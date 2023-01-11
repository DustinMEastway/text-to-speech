import { runParallel } from '@brass-raven/core/async';
import { environment } from '../environment';
import { spawnProcess } from '../lib/node/child-process';
import { deletePath, readDirectory } from '../lib/node/file-system';
import {
  Book,
  BookStatus
} from './types';

export interface ConvertBookAudioProps {
  book: Book;
  inputPath: string;
  onBookStatusChange: (book: Book) => void;
  outputPath: string;
}

/** Convert a book's txt files into audio files. */
export async function convertBookAudio({
  book,
  inputPath,
  onBookStatusChange,
  outputPath
}: ConvertBookAudioProps): Promise<void> {
  const outputBookStatus = (status: BookStatus): void => {
    onBookStatusChange({ ...book, status });
  };
  outputBookStatus(BookStatus.convertingAudio);
  const chapters = await readDirectory({ path: inputPath });
  await runParallel(chapters, async ({ name: chapter }) => {
    const txtFilePath = `${inputPath}/${chapter}`;
    await spawnProcess({
      args: [
        '-o',
        `"${outputPath}/${chapter.replace(/\.txt$/, '.aiff')}"`,
        '-f',
        `"${txtFilePath}"`
      ],
      command: 'say'
    });

    await deletePath({ path: txtFilePath });
  }, { batchSize: environment.batchSize.chapterAudio });

  outputBookStatus(BookStatus.converted);
}
