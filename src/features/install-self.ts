import { log, LOG_TYPE } from '../utils/log';
import { execCommand } from '../utils/exec';
import { SETTINGS_FILENAME } from '../config';

export const installRepositoryWithSettings = async (
  repositoryName: string,
): Promise<void | Error> => {
  try {
    await execCommand(`npm i ${repositoryName} --save-dev`);
  } catch (err) {
    log(
      `Can't find repository, please check param "repo" in your ${SETTINGS_FILENAME} file`,
      LOG_TYPE.error,
    );
    throw err;
  }
};
