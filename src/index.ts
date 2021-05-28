#!/usr/bin/env node

import { log, LOG_TYPE } from './utils/log';
import { TrivJSON } from './triv.interfaces';
import { handleInstructions } from './features/instruction';
import { installRepositoryWithSettings } from './features/install-self';
import { readJsonSettingsFile } from './features/read-json-file';

const path = process.cwd();

const install = async () => {
  try {
    const file = await readJsonSettingsFile(path);

    if (typeof file !== 'object') {
      return;
    }

    log('Reading done', LOG_TYPE.success);

    const parsed: TrivJSON = JSON.parse(file.toString());
    await installRepositoryWithSettings(parsed.repo);
    await handleInstructions(`tech/${parsed.folder}`, parsed.name, path);
  } catch (err) {
    log('Error occurred. Finish execution', LOG_TYPE.error);
  }
};

install().then();
