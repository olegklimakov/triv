/* eslint-disable no-console */

const { exec } = require('child_process');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const execCommand = (command: string, hasOutput = false) => new Promise<void>(resolve => {
  const child = exec(command);
  child.stdout.on('data', (data: any) => {
    if (hasOutput) {
      console.log(`${data}`);
    }
  });

  child.stderr.on('data', (data: any) => {
    if (hasOutput) {
      console.error(`${data}`);
    }
  });

  child.on('close', () => {
    resolve();
  });
});
