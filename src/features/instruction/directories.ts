import { getInstructionFromPackage } from '../get-from-package';
import { TrivInstructionDirectory } from '../../triv.interfaces';

export const handleDirectories = async (
  directories: TrivInstructionDirectory[],
): Promise<TrivInstructionDirectory[]> => {
  const dirs = directories.reduce((acc: Promise<any>[], dir) => {
    const directoryInstruction = getInstructionFromPackage(dir.path);
    acc.push(directoryInstruction);
    return acc;
  }, []);
  const instructions = await Promise.all(dirs);
  return directories.map((item, index) => ({
    ...item,
    instruction: instructions[index],
  }));
};
