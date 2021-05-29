import { TrivJSON } from '../../triv.interfaces';
import { handleInstructions } from './handle-instruction';

export const makeInstruction = async (instruction: TrivJSON, path: string): Promise<void | Error> => Promise.resolve(handleInstructions(`tech/${instruction.folder}`, instruction.name, path));
