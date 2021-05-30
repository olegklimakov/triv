const fsPromises = require('fs').promises;

const path = process.cwd();

const copyFile = async (pathToFile: string, fileName: string) => {
  await fsPromises.copyFile(require.resolve(pathToFile), `${path}/${fileName}`);
};

export const handleFiles = async (files: string[], filePath: string) => {
  const result = files.reduce((acc: Promise<any>[], file: string) => {
    const pathToFile = `${filePath}/${file}`;
    const fileResult = copyFile(pathToFile, file);
    acc.push(fileResult);
    return acc;
  }, []);
  return Promise.all(result);
};
