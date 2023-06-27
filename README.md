# ts-lib-template

This repository is a template to generate repositories meant to hold the source code
of NPM packages written in TypeScript.

Follow these steps after instantiating the template:
- Update the .nvmrc version file
- Update the package.json
  - Rename the package
  - Update the `engines` section
- Update the dependencies
- Run `nvm install`
- Run `npm install`
- Run `npm run compile && npm run lint && npm run test`
- Configure CodeCov
- Add the publication labels on the new repository: `patch`, `minor`, `major`, `no version`.
- Rename the header of this document to match the repository
- Replace this section of this document to include a description of the new package

## Development

### Repo init

This repository leverages [nvm](https://github.com/nvm-sh/nvm) and users should have it installed in their local environment.
In addition, it is recommended that users install a [shell hook](https://github.com/nvm-sh/nvm#deeper-shell-integration)
so that `nvm use` is run upon changing into a project that utilises `nvm`.

Upon checking out the repository, run the following commands:
```shell
nvm install
npm install
npm run compile
npm run lint
npm run test
```

### Package publication

Package publication is done manually at the moment.
