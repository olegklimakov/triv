#!/usr/bin/env node

import { log, LOG_TYPE } from './utils/log';
import { TrivJSON } from './triv.interfaces';
import { makeInstruction } from './features/instruction';
import { installRepositoryWithSettings } from './features/install-self';
import { readJsonSettingsFile } from './features/read-json-file';
import { SETTINGS } from './services/parsed-settings';

const path = process.cwd();

const install = async () => {
  try {
    const file = await readJsonSettingsFile(path);

    if (typeof file !== 'object') {
      return;
    }

    log('Reading done', LOG_TYPE.success);

    const parsed: TrivJSON = JSON.parse(file.toString());
    SETTINGS.init(parsed);
    await installRepositoryWithSettings(parsed.repo);
    await makeInstruction(parsed, path);
  } catch (err) {
    log('Error occurred. Finish execution', LOG_TYPE.error);
  }
};

install().then();
