import { padString } from '../lib/core/string';
import {
  makeDirectory,
  readFile,
  writeFile
} from '../lib/node/file-system';
import { parseXml } from '../lib/node/xml';
import { convertHtmlToText } from './convert-html-to-text';
import {
  Book,
  BookStatus,
  EpubBookContent
} from './types';

export interface ConvertBookTextProps {
  book: Book;
  inputPath: string;
  onBookStatusChange: (book: Book) => void;
  outputPath: string;
}

export async function convertBookText({
  book,
  inputPath,
  onBookStatusChange,
  outputPath
}: ConvertBookTextProps): Promise<void> {
  const outputBookStatus = (status: BookStatus): void => {
    onBookStatusChange({ ...book, status });
  };
  outputBookStatus(BookStatus.convertingText);

  const content = await parseXml({
    input: await readFile({
      path: `${inputPath}/content.opf`
    })
  });

  if (!EpubBookContent.is(content)) {
    outputBookStatus(BookStatus.failed);
    return;
  }

  const idToPath = new Map(
    content.package.manifest[0].item.map(({ $: { href, id } }) => {
      return [id, href];
    })
  );

  const chapterPaths = content.package.spine[0].itemref.map(({ $: { idref } }) => {
    return idToPath.get(idref);
  });

  const chapterNameLength = (chapterPaths.length + 1).toString().length;
  makeDirectory({ path: outputPath });
  for (let i = 0; i < chapterPaths.length; ++i) {
    const chapterPath = chapterPaths[i];
    if (!chapterPath) {
      outputBookStatus(BookStatus.failed);
      return;
    }

    const fileContent = convertHtmlToText({
      html: await readFile({
        path: `${inputPath}/${chapterPath}`
      })
    });

    const chapterName = padString({
      minLength: chapterNameLength,
      value: i + 1
    });

    await writeFile({
      content: fileContent,
      path: `${outputPath}/${chapterName}.txt`
    });
  }
}
