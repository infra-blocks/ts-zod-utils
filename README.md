# ts-lib-template
[![Build](https://github.com/infrastructure-blocks/ts-lib-template/actions/workflows/build.yml/badge.svg)](https://github.com/infrastructure-blocks/ts-lib-template/actions/workflows/build.yml)
[![Release](https://github.com/infrastructure-blocks/ts-lib-template/actions/workflows/release.yml/badge.svg)](https://github.com/infrastructure-blocks/ts-lib-template/actions/workflows/release.yml)
[![Trigger Update From Template](https://github.com/infrastructure-blocks/ts-lib-template/actions/workflows/trigger-update-from-template.yml/badge.svg)](https://github.com/infrastructure-blocks/ts-lib-template/actions/workflows/trigger-update-from-template.yml)
[![codecov](https://codecov.io/gh/infrastructure-blocks/ts-lib-template/graph/badge.svg?token=vyI1qM1EZg)](https://codecov.io/gh/infrastructure-blocks/ts-lib-template)

This repository is a template to generate repositories meant to hold the source code
of NPM packages written in TypeScript.

Follow these steps after instantiating the template:
- Remove the [trigger update from template workflow](.github/workflows/trigger-update-from-template.yml)
- Do a global search & replace for `ts-lib-template` and replace it with the name of your repository
- Likewise, do a search and replace for the *name of the package* in the `package.json` file
- Configure code coverage
- Update the status badges:
  - Replace the `Trigger Update From Template` status badge for the `Update From Template` status badge.
- Update package.json
  - Edit the search keywords
  - Edit the description
- Describe the package and its usage in this readme.
- Replace the [changelog](CHANGELOG.md) with the [stub](CHANGELOG-STUB.md) and prepare it for the first version of
the package that will be released.
- Run `nvm install && npm install`
- Run `npm run compile && npm run lint && npm run test`
- Edit the `.npmrc` file if you wish to change the defaults. Specifically, if you wish to make your package private.
