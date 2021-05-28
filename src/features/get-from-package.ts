import { TrivInstruction } from '../triv.interfaces';
import { log, LOG_TYPE } from '../utils/log';
import { SETTINGS_FILENAME } from '../config';

export const getInstructionFromPackage = async (
  address: string,
): Promise<TrivInstruction | Error | undefined> => {
  try {
    return await import(`${address}`);
  } catch (err) {
    log(
      `Error during getting instruction. Check Folder or Name params in your ${SETTINGS_FILENAME}`,
      LOG_TYPE.error,
    );
  }
  return undefined;
};
