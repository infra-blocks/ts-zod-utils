# ts-lib-template
[![Build](https://github.com/infrastructure-blocks/ts-lib-template/actions/workflows/build.yml/badge.svg)](https://github.com/infrastructure-blocks/ts-lib-template/actions/workflows/build.yml)
[![NPM Publish Release From Label](https://github.com/infrastructure-blocks/ts-lib-template/actions/workflows/npm-publish-release-from-label.yml/badge.svg)](https://github.com/infrastructure-blocks/ts-lib-template/actions/workflows/npm-publish-release-from-label.yml)
[![Trigger Update From Template](https://github.com/infrastructure-blocks/ts-lib-template/actions/workflows/trigger-update-from-template.yml/badge.svg)](https://github.com/infrastructure-blocks/ts-lib-template/actions/workflows/trigger-update-from-template.yml)

This repository is a template to generate repositories meant to hold the source code
of NPM packages written in TypeScript.

Follow these steps after instantiating the template:
- Remove the [trigger update from template workflow](.github/workflows/trigger-update-from-template.yml)
- Configure code coverage
- Update the .nvmrc version file to latest
- Update the package.json
  - Rename the package name and links
  - Update the `engines` section
- Update the dependencies
- Run `nvm install`
- Run `npm install`
- Run `npm run compile && npm run lint && npm run test`
- Edit the `.npmrc` file if you wish to change the defaults. Specifically, if you wish to make your package private.
- Update the status badges:
  - Remove the `Trigger Update From Template` status badge.
  - Add the `Update From Template` status badge.
  - Rename the rest of the links to point to the right repository.
- Edit this readme to correspond to the package.

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

This package leverages the [npm-publish-from-label](https://github.com/infrastructure-blocks/npm-publish-from-label-action) action
as a turnkey, automated mechanism for publishing packages. Refer to its documentation to understand its capabilities.

Packages should therefore not be published manually, as these tasks are automated by the CI.
