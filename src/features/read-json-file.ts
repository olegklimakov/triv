import { log, LOG_TYPE } from '../utils/log';
import { SETTINGS_FILENAME } from '../config';

const fsPromises = require('fs').promises;

const path = process.cwd();

export const readJsonSettingsFile = async (): Promise<object | Error> => {
  try {
    const JSONFilePath = `${path}/${SETTINGS_FILENAME}`;
    log(`Try to read settings file in: ${JSONFilePath}`);
    const file = await fsPromises.readFile(JSONFilePath);
    return file;
  } catch (err) {
    log('Error: Cant find settings file', LOG_TYPE.error);
    log(`Make sure you have ${SETTINGS_FILENAME} file in your repository`, LOG_TYPE.main);
    throw err;
  }
};
