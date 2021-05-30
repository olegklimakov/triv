import { TrivInitialInstruction, TrivJSON } from '../../triv.interfaces';
import { getInstructionFromPackage } from '../get-from-package';
import { handleInstruction } from './handle-instruction';

export const getInstructionByTechType = async (jsonData: TrivJSON): Promise<void | Error> => {
  const initialInstruction = await getInstructionFromPackage<TrivInitialInstruction>(''); // empty to get root instruction
  if (initialInstruction instanceof Error || !initialInstruction) {
    throw Error();
  }

  const data = initialInstruction[jsonData.tech] ? initialInstruction[jsonData.tech] : Error();
  if (data instanceof Error) {
    throw Error();
  }

  await handleInstruction(data, '');
};
