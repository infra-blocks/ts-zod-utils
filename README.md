# ts-lib-template
[![Build](https://github.com/infrastructure-blocks/ts-lib-template/actions/workflows/build.yml/badge.svg)](https://github.com/infrastructure-blocks/ts-lib-template/actions/workflows/build.yml)
[![Release](https://github.com/infrastructure-blocks/ts-lib-template/actions/workflows/release.yml/badge.svg)](https://github.com/infrastructure-blocks/ts-lib-template/actions/workflows/release.yml)
[![Trigger Update From Template](https://github.com/infrastructure-blocks/ts-lib-template/actions/workflows/trigger-update-from-template.yml/badge.svg)](https://github.com/infrastructure-blocks/ts-lib-template/actions/workflows/trigger-update-from-template.yml)
[![codecov](https://codecov.io/gh/infrastructure-blocks/ts-lib-template/graph/badge.svg?token=vyI1qM1EZg)](https://codecov.io/gh/infrastructure-blocks/ts-lib-template)

This repository is a template to generate repositories meant to hold the source code
of NPM packages written in TypeScript.

Follow these steps after instantiating the template:
- Remove the [trigger update from template workflow](.github/workflows/trigger-update-from-template.yml)
- Configure code coverage
- Update the .nvmrc version file to latest
- Update the package.json
  - Rename the package name and links
  - Edit the search keywords
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
