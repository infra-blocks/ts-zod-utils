# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.24.0] - 2026-01-22

### Added

- `zu.inferBrand<T>` to extrand the branding of a given type. Resolves either to the brand,
or never if the type is not branded. Examples: `zu.inferBrand<AwsAccounId> = "AwsAccountId"`,
`zu.inferBrand<string> = never`.

## [0.23.1] - 2026-01-21

### Changed

- Updgaded the `@infra-blocks/types` library to `0.26.0` to leverage the `trusted` functionality.
This change is backwards compatible.

## [0.23.0] - 2026-01-20

### Added

- `zu.codec.ms()`, which is a codec wrapping the [ms](https://www.npmjs.com/package/ms) package. In
comes a string as expected by `ms`, out comes the result of running `ms(input)` on it. And vice-versa
for the encoding.

## [0.22.0] - 2026-01-20

### Added

- `zu.string.number()` that parses numbers as string and return the branded type `NumberString`.

## [0.21.0] - 2026-01-20

### Added

- `zu.string.json()` with branded type `JsonString`.
- `zu.codec.jsonParse(schema)`, a codec factory that first transforms the string input
using JSON.parse, then forwards the validation to the provided schema.
- `zu.codec.stringSplit(separator)`, a codec factory that splits and joins using the
provided separator.

### Changed

- Moved `zu.json.stringified()` to `zu.codec.stringToJson()`, and made it a codec! The
codec uses `zu.codec.jsonParse(json())` internally.

### Fixed

- Fixed the naming of `zu.codec.stringtoInteger` to `zu.codec.stringToInteger`.

## [0.20.0] - 2026-01-20

### Changed

- Moved the `zu.integer()` function under the newly created `zu.number` module. So,
it became `zu.number.integer()`. This is more coherent with its string equivalent
found under `zu.string.integer()`.

## [0.19.0] - 2026-01-19

### Changed

- Moved `zu.csv()`, `zu.stringToInteger()` and `zu.stringToUrl()` under `zu.codec`.
They kept the same name, so `zu.csv()` became `zu.codec.csv()`.

## [0.18.0] - 2026-01-19

### Added

- `zu.string.url()`, a branded version of `z.url()`. The alias is `UrlString`.

## [0.17.0] - 2026-01-18

### Changed

- Changed `zu.csv` from schema to codec.

## [0.16.0] - 2026-01-18

### Changed

- `zu.stringToInt` has been renamed to `zu.stringToInteger` and now uses `zu.integer()`
to produces the final forward type: `Integer`.

## [0.15.0] - 2026-01-18

### Added

- The `zu.string` module with `zu.string.integer()` as the first schema. The return
is branded and aliased as `IntegerString`.

## [0.14.0] - 2026-01-18

### Added

- Branded `zu.integer()` schema of type `Integer`.

## [0.13.0] - 2026-01-17

### Added

- The `zu.stringToUrl()` codec, as per Zod's documentation.

## [0.12.0] - 2026-01-17

### Added

- The `iso.countryCode.alpha3()` schema that validates the input is a valid 3 character
ISO 3166 country code. The return type is branded.

## [0.11.1] - 2026-01-11

### Fixed

- Now correctly exporting the `iso` module's types under `@infra-blocks/zod-utils/iso`
as we do with other modules.

## [0.11.0] - 2026-01-11

### Added

- The `iso` module with `currencyCode` as the first schema available.

## [0.10.1] - 2026-01-09

### Changed

- Reviewed the implementation exporting the `json` and `geojson` module. Used `Object.assign`
instead of the nested functions approach. This should have no impact on the public API.

## [0.10.0] - 2026-01-08

### Changed

- Changed the return types of AWS scalars to branded versions. For example, where `zu.aws.region()`
used to parse and return a `string`, it now parses a `string` and returns an `AwsRegion`, which
is a branded type of the form `string & z.$brand<"AwsRegion">`. It can still be used where strings
are expected, but variables can now narrow their types directly to a valid AWS region by using
the alias `AwsRegion`. This has been done for AWS accound IDs, ARNs, partitions and regions.

## [0.9.0] - 2026-01-05

### Added

- Several `aws` related schemas:
  - `zu.aws.accountId()`, to validate that a string follows the AWS account ID format
  - `zu.aws.arn()`, to validate that a string is a valid AWS ARN.
  - `zu.aws.partition()`, to validate that a string is a valid AWS partition.
  - `zu.aws.region()`, to validate that a string is a valida AWS region.

### Changed

- Rewrote `zu.validate()` as `zu.isValid()`.

## [0.8.0] - 2026-01-02

### Added

- `stringToInt` codec, as defined in [Zod's documentation](https://zod.dev/codecs?id=stringtoint).

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

[0.23.0]: https://github.com/infra-blocks/ts-zod-utils/compare/v0.22.0...v0.23.0
[0.22.0]: https://github.com/infra-blocks/ts-zod-utils/compare/v0.21.0...v0.22.0
[0.21.0]: https://github.com/infra-blocks/ts-zod-utils/compare/v0.20.0...v0.21.0
[0.20.0]: https://github.com/infra-blocks/ts-zod-utils/compare/v0.19.0...v0.20.0
[0.19.0]: https://github.com/infra-blocks/ts-zod-utils/compare/v0.18.0...v0.19.0
[0.18.0]: https://github.com/infra-blocks/ts-zod-utils/compare/v0.17.0...v0.18.0
[0.17.0]: https://github.com/infra-blocks/ts-zod-utils/compare/v0.16.0...v0.17.0
[0.16.0]: https://github.com/infra-blocks/ts-zod-utils/compare/v0.15.0...v0.16.0
[0.15.0]: https://github.com/infra-blocks/ts-zod-utils/compare/v0.14.0...v0.15.0
[0.14.0]: https://github.com/infra-blocks/ts-zod-utils/compare/v0.13.0...v0.14.0
[0.13.0]: https://github.com/infra-blocks/ts-zod-utils/compare/v0.12.0...v0.13.0
[0.12.0]: https://github.com/infra-blocks/ts-zod-utils/compare/v0.11.1...v0.12.0
[0.11.1]: https://github.com/infra-blocks/ts-zod-utils/compare/v0.11.0...v0.11.1
[0.11.0]: https://github.com/infra-blocks/ts-zod-utils/compare/v0.10.1...v0.11.0
[0.10.1]: https://github.com/infra-blocks/ts-zod-utils/compare/v0.9.0...v0.10.1
[0.10.0]: https://github.com/infra-blocks/ts-zod-utils/compare/v0.9.0...v0.10.0
[0.9.0]: https://github.com/infra-blocks/ts-zod-utils/compare/v0.8.0...v0.9.0
[0.8.0]: https://github.com/infra-blocks/ts-zod-utils/compare/v0.7.0...v0.8.0
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
