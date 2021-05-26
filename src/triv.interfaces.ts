export interface TrivInstruction {
  directories?: TrivInstructionDirectory[];
  devPackages?: string[];
  files?: string[];
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

