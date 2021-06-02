import { execCommand } from './exec';
import { PACKAGE_MANAGER } from '../triv.interfaces';
import { SETTINGS } from '../services/parsed-settings';
import { log } from './log';

export const installDependency = async (name: string, dev = true): Promise<any> => {
  let command;
  let text;
  switch (SETTINGS.manager) {
    case PACKAGE_MANAGER.yarn:
      text = `yarn add ${name} ${dev ? '-D' : ''}`;
      log(text);
      command = execCommand(text, true);
      break;
    default:
      text = `npm i ${name} ${dev ? '--save-dev' : ''}`;
      log(text);
      command = execCommand(text);
      break;
  }
  return command;
};
