export interface TrivInstruction {
  directories?: TrivInstructionDirectory[];
  devPackages?: string[];
  files?: string[];
  packageJsonHooks: JsonHook[]
}

export interface TrivJSON {
  repo: string;
  name: string;
  folder: string;
}

export interface TrivInstructionDirectory {
  name: string;
  path: string;
}

export interface JsonHook {
  [key: string]: JsonHook;
}
