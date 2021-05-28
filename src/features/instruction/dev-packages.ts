import { execCommand } from '../../utils/exec';

export const installDevPackages = async (devPackages: string[]) => {
  const packagesCommand = `npm i ${devPackages.join(' ')} --save-dev`;
  await execCommand(packagesCommand);
};
