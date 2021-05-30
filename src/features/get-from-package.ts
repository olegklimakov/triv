import { log, LOG_TYPE } from '../utils/log';
import { SETTINGS_FILENAME } from '../config';
import { SETTINGS } from '../services/parsed-settings';

export const getInstructionFromPackage = async <T>(
  address: string,
): Promise<T | Error | undefined> => {
  try {
    const handledAddress = address ? `/${address}` : '';
    return await import(`${SETTINGS.name}${handledAddress}`);
  } catch (err) {
    log(
      `Error during getting instruction. Check Folder or Name params in your ${SETTINGS_FILENAME}`,
      LOG_TYPE.error,
    );
  }
  return undefined;
};
