# <center> Triv </center>

## <center> CLI tools for your JS/TS projects </center>

📖 Allows you to automate adding your favourite tools to your Node.js repository.

Forget about copy and pasting your linter/prettier or other settings throw different projects. Organize them in the separate repository.

- ⭐ Zero dependancy
- ⭐ Typescript strict mode

## Install

1. Install package

- Using npm `npm i triv --save-dev`
- Using yarn `yarn add triv -D`

## Run

2. Add `.triv.json` in root of your repository.
3. Create repository with your settings. [Example](https://github.com/olegklimakov/settings-storage)
4. Add address to your `.triv.json` file.

Example:

```json
{
  "repo": "https://github.com/olegklimakov/settings-storage.git",
  "name": "settings-storage",
  "folder": "frontend"
}
```

5. Run with `triv` command

##Todo

- [ ] Documentation about settings repo
- [ ] Tests
- [ ] CI/CD with CircleCI
- [ ] Version support to dev dependancy
