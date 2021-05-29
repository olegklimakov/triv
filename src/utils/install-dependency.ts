import { execCommand } from './exec';
import { PACKAGE_MANAGER } from '../triv.interfaces';
import { SETTINGS } from '../services/parsed-settings';

export const installDependency = async (name: string, dev = true): Promise<any> => {
  let command;
  switch (SETTINGS.manager) {
    case PACKAGE_MANAGER.yarn:
      command = execCommand(`yarn install ${name} ${dev ? '-D' : ''}`);
      break;
    default:
      command = execCommand(`npm i ${name} ${dev ? '--save-dev' : ''}`);
      break;
  }
  return Promise.resolve(command);
};
