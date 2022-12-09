import {
  convertBookDirectoryText,
  unzipBookDirectory
} from './epub';

const config = {
  inputPath: `${__dirname}/../input`,
  outputPath: `${__dirname}/../output`
};

(async (): Promise<void> => {
  try {
    const { inputPath, outputPath } = config;

    await unzipBookDirectory({ path: inputPath });

    await convertBookDirectoryText({
      inputPath,
      outputPath
    });
  } catch (error) {
    console.log('ERROR:\n', error);
  }
})();
