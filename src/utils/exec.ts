/* eslint-disable no-console */

const { exec } = require('child_process');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const execCommand = (command: string) => new Promise<void>((resolve, reject) => {
  const child = exec(command);
  child.stdout.on('data', (data: any) => {
    console.log(`${data}`);
  });

  child.stderr.on('data', (data: any) => {
    console.error(`${data}`);
  });

  child.on('close', () => {
    resolve();
  });
});
