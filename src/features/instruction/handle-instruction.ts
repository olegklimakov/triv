import { installDevPackages } from './dev-packages';
import { applyPackageJsonHooks } from './json-hooks';
import { handleFiles } from './files';
import { TrivInstruction } from '../../triv.interfaces';
import { handleDirectories } from './directories';
import { SETTINGS } from '../../services/parsed-settings';
import { log } from '../../utils/log';

export const handleInstruction = async (
  instruction: TrivInstruction,
  instructionPath: string, // for Files
): Promise<void | Error> => {
  if (instruction?.devPackages) {
    await installDevPackages(instruction?.devPackages);
  }

  if (instruction?.packageJsonHooks?.length) {
    await applyPackageJsonHooks(instruction.packageJsonHooks);
  }

  if (instruction?.files) {
    await handleFiles(instruction.files, `${SETTINGS.name}/${instructionPath}`);
  }

  if (instruction?.directories) {
    const dirs = await handleDirectories(instruction.directories);
    dirs.forEach(dir => {
      if (!dir.instruction) {
        return;
      }
      log(`Handling instruction ${dir.name}...`);
      handleInstruction(dir.instruction, dir.path);
    });
  }
};
