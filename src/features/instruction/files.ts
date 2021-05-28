const fsPromises = require('fs').promises;

const copyFile = async (pathToFile: string, fileName: string, execPath: string) => {
  await fsPromises.copyFile(require.resolve(pathToFile), `${execPath}/${fileName}`);
};

export const handleFiles = async (files: string[], filePath: string, execPath: string) => {
  const result = files.reduce((acc: Promise<any>[], file: string) => {
    const pathToFile = `${filePath}/${file}`;
    const fileResult = copyFile(pathToFile, file, execPath);
    acc.push(fileResult);
    return acc;
  }, []);
  return Promise.all(result);
};
