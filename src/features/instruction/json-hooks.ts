const fsPromises = require('fs').promises;

export const applyPackageJsonHooks = async (hooks: object[], execPath: string) => {
  const packageJson = await fsPromises.readFile(`${execPath}/package.json`);
  let parsedPackageJson = JSON.parse(packageJson);
  hooks.forEach(hook => {
    parsedPackageJson = {
      ...parsedPackageJson,
      ...hook,
    };
  });

  try {
    await fsPromises.writeFile(
      `${execPath}/package.json`,
      JSON.stringify(parsedPackageJson, null, 2),
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};
