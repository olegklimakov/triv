#!/usr/bin/env node

const path = process.cwd();
const { exec } = require('child_process')
const fsPromises = require('fs').promises

console.log(path);
const install = async () => {
  const file = await fsPromises.readFile(path + '/proj-starter.json');
  console.log(file);
  const parsed = JSON.parse(file)
  // await execCommand(`npm i ${parsed.repo} --save-dev`)
  const installInstruction = await require(`${parsed.name}/tech/${parsed.folder}/install.js`);
  console.log('PATH', installInstruction);
  console.log('PACKAGE', installInstruction.packages);

  // if (installInstruction.packages?.length) {
  //   const packagesCommand = `npm i ${installInstruction.packages.join(' ')} --save-dev`;
  //   await execCommand(packagesCommand);
  // }

  if (installInstruction.directories?.length) {
    for (let item of installInstruction.directories) {
      await handleNestedInstruction(parsed.name, item)
    }
  }
  // const file = await fsPromises.readFile('')
}

const handleNestedInstruction = async (repositoryName: string, instruction: any) => {
  const address = `${repositoryName}/${instruction.path}/install.js`
  const installInstruction = await require(address);

  // if (installInstruction?.devPackages) {
  //   const packagesCommand = `npm i ${installInstruction.devPackages.join(' ')} --save-dev`;
  //   await execCommand(packagesCommand);
  // }

  if (installInstruction?.files) {
    for (let file of installInstruction.files) {
      const pathToFile = `${repositoryName}/${instruction.path}/${file}`;
      console.log(pathToFile);
      await copyFiles(pathToFile, file);
    }
  }
  // console.log(packagesCommand);

  console.log(installInstruction);
}

const copyFiles = async (pathToFile: string, fileName: string) => {
  await fsPromises.copyFile(require.resolve(pathToFile), `${path}/${fileName}`);
}


const execCommand = (command: string) => new Promise<void>((resolve, reject) => {
  const child = exec(command);
  child.stdout.on( 'data', ( data: any ) => {
    console.log( `${ data }` );
  } );

  child.stderr.on( 'data', ( data: any ) => {
    console.error( `${ data }` );
  } );

  child.on( 'close', ( code: any ) => {
    console.log( `child process exited with code ${ code }` );
    resolve();
  } );
})

install().then()
