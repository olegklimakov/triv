import { log } from '../../utils/log';
import { getInstructionFromPackage } from '../get-from-package';
import { installDevPackages } from './dev-packages';
import { applyPackageJsonHooks } from './json-hooks';
import { handleFiles } from './files';

export const handleInstructions = async (
  instructionPath: string,
  repoName: string,
  execPath: string,
): Promise<void | Error> => {
  log(`Getting the instruction. Path: ${repoName}/${instructionPath}`);
  const instruction = await getInstructionFromPackage(`${repoName}/${instructionPath}`);

  if (!instruction || instruction instanceof Error) {
    throw Error();
  }

  log('Apply instruction');

  if (instruction?.devPackages) {
    await installDevPackages(instruction?.devPackages);
  }

  if (instruction?.packageJsonHooks?.length) {
    await applyPackageJsonHooks(instruction.packageJsonHooks, execPath);
  }

  if (instruction?.files) {
    await handleFiles(instruction.files, `${repoName}/${instructionPath}`, execPath);
  }

  if (instruction?.directories) {
    const directories = instruction.directories.reduce((acc: Promise<any>[], dir) => {
      const directory = handleInstructions(dir.path, repoName, execPath);
      acc.push(directory);
      return acc;
    }, []);
    await Promise.all(directories);
  }
};
