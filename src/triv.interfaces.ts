export interface TrivInstructionDirectory {
  name: string;
  path: string;
  instruction?: TrivInstruction;
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

export interface TrivInitialInstruction {
  [key: string]: TrivInstruction;
}

export enum PACKAGE_MANAGER {
  'yarn' = 'yarn',
  'npm' = 'npm',
}

export interface TrivJSON {
  repo: string;
  name: string;
  tech: string;
  manager: PACKAGE_MANAGER;
}
