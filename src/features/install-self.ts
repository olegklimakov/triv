import { log, LOG_TYPE } from '../utils/log';
import { SETTINGS_FILENAME } from '../config';
import { installDependency } from '../utils/install-dependency';

export const installRepositoryWithSettings = async (
  repositoryName: string,
): Promise<void | Error> => {
  try {
    log('Start install settings repo', LOG_TYPE.main);
    await installDependency(repositoryName);
    log(`Repo ${repositoryName} - successfully installed`, LOG_TYPE.success);
  } catch (err) {
    log(
      `Can't find repository, please check param "repo" in your ${SETTINGS_FILENAME} file`,
      LOG_TYPE.error,
    );
    throw err;
  }
};
