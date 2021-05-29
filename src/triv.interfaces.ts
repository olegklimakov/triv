export interface TrivInstructionDirectory {
  name: string;
  path: string;
}

export interface JsonHook {
  [key: string]: JsonHook;
}

export interface TrivInstruction {
  directories?: TrivInstructionDirectory[];
  devPackages?: string[];
  files?: string[];
  packageJsonHooks: JsonHook[];
}

export enum PACKAGE_MANAGER {
  'yarn' = 'yarn',
  'npm' = 'npm',
}

export interface TrivJSON {
  repo: string;
  name: string;
  folder: string;
  manager: PACKAGE_MANAGER;
}
