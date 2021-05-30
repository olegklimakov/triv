const fsPromises = require('fs').promises;

const path = process.cwd();

export const applyPackageJsonHooks = async (hooks: object[]) => {
  const packageJson = await fsPromises.readFile(`${path}/package.json`);
  let parsedPackageJson = JSON.parse(packageJson);
  hooks.forEach(hook => {
    parsedPackageJson = {
      ...parsedPackageJson,
      ...hook,
    };
  });

  try {
    await fsPromises.writeFile(`${path}/package.json`, JSON.stringify(parsedPackageJson, null, 2));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};
