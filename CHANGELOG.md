# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.7.0] - 2026-01-02

### Changed

- Minimum required node version is now Node 22.

## [0.6.0] - 2026-01-02

### Added

- The `typeGuard` and `validate` utility for predicate checks against a schema.

## [0.5.0] - 2025-12-22

### Added

- The `zu.csv()` schema to parse and transform comma separated strings into arrays.

### Changed

- Updated to `zod@4`. This exports the breaking changes between `zod@3` and `zod@4`.
Mainly, the [default](https://zod.dev/v4/changelog#default-updates)
function has slightly different (now better) semantics. The `default` value
bypasses the parsing and must be assignable to the output type. This difference
is very noticeable with the `json.stringified()` variants. For example, what used
to be `json.stringified.primitive().default("42")`, should now be written as
`json.stringified.primitive().default(42)` to obtain the *number* 42 as a default
value.

## [0.4.5] - 2024-05-19

### Changed

- Migrated to the [infra-blocks](https://github.com/infra-blocks) organization.

## [0.4.4] - 2024-04-21

### Added

- This changelog!

## [0.4.3] - 2024-04-13

### Added

- `package.json` search keywords.

## [0.4.2] - 2024-04-08

### Added

- `package.json` repository URL.

## [0.4.1] - 2024-04-07

### Changed

- Split the `README.md` file into `README.md` and `CONTIBUTING.md`.

## [0.4.0] - 2024-04-07

### Added

- `zu.geojson` module with utilities to validate GeoJSON objects, sub schemas and inferred types.

## [0.3.0] - 2024-04-06

### Added

- Exported more subtypes for JSON.
- Exported more sub schemas under `zu.json`.
- Added usage documentation to showcase how to use the changes.

### Changed

- `zu.json.literal()` for `zu.json.primitive()`

## [0.2.0] - 2024-04-06

### Changed

- This is the same package content as the version before. It results from CI issues where the first package
publication didn't succeed completely. This is a re-release.

## [0.1.0] - 2024-04-06

### Added

- First iteration of the library. It has JSON parsing utilities.

[0.7.0]: https://github.com/infra-blocks/ts-zod-utils/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/infra-blocks/ts-zod-utils/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/infra-blocks/ts-zod-utils/compare/v0.4.5...v0.5.0
[0.4.5]: https://github.com/infra-blocks/ts-zod-utils/compare/v0.4.4...v0.4.5
[0.4.4]: https://github.com/infra-blocks/ts-zod-utils/compare/v0.4.3...v0.4.4
[0.4.3]: https://github.com/infra-blocks/ts-zod-utils/compare/v0.4.2...v0.4.3
[0.4.2]: https://github.com/infra-blocks/ts-zod-utils/compare/v0.4.1...v0.4.2
[0.4.1]: https://github.com/infra-blocks/ts-zod-utils/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/infra-blocks/ts-zod-utils/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/infra-blocks/ts-zod-utils/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/infra-blocks/ts-zod-utils/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/infra-blocks/ts-zod-utils/releases/tag/v0.1.0
