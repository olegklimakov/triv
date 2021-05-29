import { installDependency } from '../../utils/install-dependency';
import { log, LOG_TYPE } from '../../utils/log';

export const installDevPackages = async (devPackages: string[]): Promise<void | Error> => {
  try {
    await installDependency(devPackages.join(' '));
  } catch (e) {
    log('Error during install dependancy', LOG_TYPE.error);
  }
};
