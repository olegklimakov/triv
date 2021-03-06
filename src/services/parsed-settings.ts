import { PACKAGE_MANAGER, TrivJSON } from '../triv.interfaces';

const defaultSettings: TrivJSON = {
  repo: '',
  name: '',
  tech: '',
  manager: PACKAGE_MANAGER.npm,
};

class ParsedSettings {
  private settings: TrivJSON;

  constructor() {
    this.settings = defaultSettings;
  }

  init(data: TrivJSON): void {
    this.settings = {
      ...this.settings,
      ...data,
    };
  }

  get manager(): PACKAGE_MANAGER {
    return this.settings.manager;
  }

  get name(): string {
    return this.settings.name;
  }
}

export const SETTINGS = new ParsedSettings();
