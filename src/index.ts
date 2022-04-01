import { mkdir, readdir, readFile, rm, writeFile } from 'fs/promises';
import { dirname } from 'path';

import { exec } from './core';

const config = {
  input: {
    bookTextPath: 'text',
    path: `${__dirname}/../input`
  },
  output: {
    path: `${__dirname}/../output`,
    writeChapterAudio: true,
    writeChapterText: false
  }
}

function padString(value: number | string, minLength: number): string {
  value = value.toString();
  return '0'.repeat(Math.max(0, minLength - value.length)) + value;
}

interface BookConfig {
  bookIndex: number;
  bookName: string;
  bookPath: string;
  outputPath: string;
}

interface ChapterConfig extends BookConfig {
  chapterIndex: number;
  chapterPath: string;
}

async function convertChapterToAudio({ chapterPath, outputPath }: ChapterConfig) {
  const chapterContent = (await readFile(chapterPath)).toString().replace(
    // remove comments
    /<!--[\s\S]*?-->/g,
    ''
  ).replace(
    // remove opening and closing tags
    /<[\/!]?\??[A-Za-z][^>]*>/g,
    ''
  ).replace(
    // tidy up newline whitespaces
    /\s*\n\s*/g,
    '\n'
  );

  const chapterOputAudioFileName = `${outputPath}.aiff`;
  const chapterOputTextFileName = `${outputPath}.txt`;
  const { writeChapterAudio, writeChapterText } = config.output;

  if (writeChapterAudio || writeChapterText) {
    await mkdir(dirname(chapterOputTextFileName), { recursive: true });
    await writeFile(chapterOputTextFileName, chapterContent);
  }

  if (writeChapterAudio) {
    await exec(`say -o ${chapterOputAudioFileName} -f ${chapterOputTextFileName}`);
  }

  if (writeChapterAudio && !writeChapterText) {
    await rm(chapterOputTextFileName);
  }
}

async function convertBookToAudio(bookConfig: BookConfig) {
  const { bookName, bookPath, outputPath } = bookConfig;
  const chapterNames = await readDirectory(bookPath);

  for (let chapterIndex = 0; chapterIndex < chapterNames.length; ++chapterIndex) {
    const chapterName = chapterNames[chapterIndex];

    await convertChapterToAudio({
      ...bookConfig,
      chapterIndex,
      chapterPath: `${bookPath}/${chapterName}`,
      outputPath: `${outputPath}/${bookName}-${padString(chapterIndex + 1, chapterName.length.toString().length)}`
    });
  }
}

function filterFileName(fileName: string): boolean {
  return !fileName.startsWith('.');
}

async function readDirectory(directoryPath: string): Promise<string[]> {
  return (await readdir(directoryPath)).filter(filterFileName).sort();
}

async function main(): Promise<void> {
  const bookNames = await readDirectory(config.input.path);
  for (let bookIndex = 0; bookIndex < bookNames.length; ++bookIndex) {
    const bookName = bookNames[bookIndex];

    await convertBookToAudio({
      bookIndex,
      bookName: bookName,
      bookPath: `${config.input.path}/${bookName}/${config.input.bookTextPath}`,
      outputPath: `${config.output.path}/${bookName}`
    });
  }
}

main();
