/* eslint-disable no-console */

import { log, LOG_TYPE } from './log';

const { exec } = require('child_process');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const execCommand = (command: string, hasOutput = false) => new Promise<boolean>(resolve => {
  const child = exec(command);
  child.stdout.on('data', (data: any) => {
    if (hasOutput) {
      console.log(`${data}`);
    }
  });

  child.stderr.on('data', (data: any) => {
    if (hasOutput) {
      log(`${data}`, LOG_TYPE.error);
    }
  });

  child.on('close', () => {
    resolve(true);
  });
});
