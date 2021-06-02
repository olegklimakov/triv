import { installDependency } from '../../utils/install-dependency';
import { log, LOG_TYPE } from '../../utils/log';

export const installDevPackages = async (devPackages: string[]): Promise<void | Error> => {
  try {
    log(`Install dependencies: ${devPackages.join(' ')}`);
    await installDependency(devPackages.join(' '));
    log(`Success: Install dependencies: ${devPackages.join(' ')}`, LOG_TYPE.success);
  } catch (e) {
    log('Error during install dependancy', LOG_TYPE.error);
  }
};
