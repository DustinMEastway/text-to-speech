import {
  Book,
  BookStatus,
  convertBooksAudio,
  convertBooksText,
  unzipBookDirectory
} from './epub';
import { readDirectory } from './lib/node/file-system';

const config = {
  inputPath: `${__dirname}/../input`,
  outputPath: `${__dirname}/../output`
};

(async (): Promise<void> => {
  try {
    const { inputPath, outputPath } = config;

    // Move Books into their own directories and unzip them.
    await unzipBookDirectory({ path: inputPath });

    // Create a list of books based on the directoires in the input path.
    const books = new Map(
      (await readDirectory({
        path: inputPath
      })).map(({ name }, index): [string, Book] => {
        const book = {
          id: `${index}`,
          name,
          status: BookStatus.queued
        };

        return [book.id, book];
      })
    );
    const onBookStatusChange = (book: Book): void => {
      books.set(book.id, book);
    };

    // Convert the books into txt files.
    await convertBooksText({
      books,
      inputPath,
      onBookStatusChange,
      outputPath
    });

    // Convert the txt files into audio files.
    await convertBooksAudio({
      books,
      inputPath: outputPath,
      onBookStatusChange,
      outputPath
    });
  } catch (error) {
    console.log('ERROR:\n', error);
  }
})();
