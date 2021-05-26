#!/usr/bin/env node

import { log, LOG_TYPE } from './log';
import { TrivInstruction, TrivJSON } from './triv.interfaces';

const path = process.cwd();
const { exec } = require('child_process')
const fsPromises = require('fs').promises
const SETTINGS_FILENAME = '.triv.json';

const install = async () => {
  try {
    const file = await readJsonSettingsFile()

    if (typeof file !== 'object') { return }
    log('Reading done', LOG_TYPE.success)

    const parsed: TrivJSON = JSON.parse(file.toString())
    await installRepositoryWithSettings(parsed.repo);
    await handleInstructions(`tech/${parsed.folder}`, parsed.name)
  } catch (err) {
    log('Error occurred. Finish execution', LOG_TYPE.error)
  }
}

const handleInstructions = async (instructionPath: string, repoName: string): Promise<void | Error> => {
  log(`Getting the instruction. Path: ${repoName}/${instructionPath}`)
  const instruction = await getInstructionFromPackage(`${repoName}/${instructionPath}`)

  if (!instruction || (instruction instanceof Error)) {
    throw Error
  }
  log('Apply instruction')
  // if (instruction?.devPackages) {
  //   // todo add version support
  //   const packagesCommand = `npm i ${instruction.devPackages.join(' ')} --save-dev`;
  //   await execCommand(packagesCommand);
  // }

  if (instruction?.packageJsonHooks?.length) {
    for (let hook of instruction?.packageJsonHooks) {
      const packageJson = await fsPromises.readFile(path + `/package.json`)
      const parsedPackageJson = JSON.parse(packageJson);
      const result = {
        ...parsedPackageJson,
        ...hook
      }
      console.log("RESULT", result);
      try {
        await fsPromises.writeFile(path + `/package.json`, JSON.stringify(result, null, 2));
      } catch (e) {
        console.log(e);
      }

    }
  }

  // if (instruction?.files) {
  //   for (let file of instruction.files) {
  //     const pathToFile = `${repoName}/${instructionPath}/${file}`;
  //     console.log(pathToFile);
  //     await copyFile(pathToFile, file);
  //   }
  // }

  if (instruction?.directories) {
    for (let dir of instruction.directories) {
      log(`Apply instruction ${dir.name}`)
      await handleInstructions(dir.path, repoName);
      log(`${dir.name} - Done`, LOG_TYPE.success)
    }
  }
}

const getInstructionFromPackage = async (address: string): Promise<TrivInstruction | Error | undefined> => {
  try {
    return  await require(`${address}`);
  } catch (err) {
    log(`Error during getting instruction. Check Folder or Name params in your ${SETTINGS_FILENAME}`, LOG_TYPE.error);
  }
}

const installRepositoryWithSettings = async (repositoryName: string): Promise<void | Error> => {
  try {
    await execCommand(`npm i ${repositoryName} --save-dev`)
  } catch (err) {
    log(`Can't find repository, please check param "repo" in your ${SETTINGS_FILENAME} file`, LOG_TYPE.error);
    throw err
  }
}

const readJsonSettingsFile = async (): Promise<object | Error> => {
  try {
    const JSONFilePath = path + `/${SETTINGS_FILENAME}`;
    log(`Try to read settings file in: ${JSONFilePath}`)
    return await fsPromises.readFile(JSONFilePath);
  } catch (err) {
    log(`Error: Cant find settings file`, LOG_TYPE.error);
    log(`Make sure you have ${SETTINGS_FILENAME} file in your repository`, LOG_TYPE.main);
    throw err
  }
}

const copyFile = async (pathToFile: string, fileName: string) => {
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
    resolve();
  } );
})

install().then()

