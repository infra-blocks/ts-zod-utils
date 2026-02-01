# ts-zod-utils
[![Build](https://github.com/infra-blocks/ts-zod-utils/actions/workflows/build.yml/badge.svg)](https://github.com/infra-blocks/ts-zod-utils/actions/workflows/build.yml)
[![Release](https://github.com/infra-blocks/ts-zod-utils/actions/workflows/release.yml/badge.svg)](https://github.com/infra-blocks/ts-zod-utils/actions/workflows/release.yml)
[![codecov](https://codecov.io/gh/infra-blocks/ts-zod-utils/graph/badge.svg?token=Q9ZLX7AMPH)](https://codecov.io/gh/infra-blocks/ts-zod-utils)

[zod](https://www.npmjs.com/package/zod) is an amazing parsing library. This package aims to extend it with various utilities
that I've found useful through my own programming. Those include schemas I find myself writing often, codecs that are
shown in Zod's documentation but not yet available, and type utilities.

## Branded types

Some schemas return [branded types](https://zod.dev/api?id=branded-types) for extra type safety. When that is the case,
the documentation will highlight that fact. Otherwise, assume classical structural Typescript as output types.

When branding is used, the brand is a string that's the same as the name of the type. For example, the `AwsAccountId`
is an alias for `string & z.$brand<"AwsAccountId">`.

One caveat of using branded types schema is that the default value must also be branded (as should be). So,
for example, where you would write `z.int().default(5)`, you instead have to write `zu.number.integer().default(zu.number.integer().parse(5))`.
This example also highlights an inconsistency with Zod where you can have `z.int().default(123.456)`, which both
compiles and runs successfully.

## API

- [aws](#aws)
- [codec](#codec)
- [geojson](#geojson)
- [inferBrand](#inferbrand)
- [iso](#iso)
- [json](#json)
- [number](#number)
- [string](#string)
- [typeGuard](#typeguard)
- [isValid](#is-valid)

### aws

The `zu.aws` module contains utilities to validate various AWS elements. All schemas return [branded types](#branded-types).

```typescript
import { zu } from "@infra-blocks/zod-utils";

// Validates a 12 digit string, as describe here: https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-identifiers.html
zu.aws.accountId().parse("123456789012");
// Validates an AWS ARN, as described here: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference-arns.html
zu.aws.arn().parse("arn:aws:iam:us-east-1:123456789012:user/joe-cunt");
// Validates an AWS partition, as describe here: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference-arns.html
zu.aws.partition().parse("aws");
// Validates an AWS region, as described here: https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html#available-regions
// "gov" and "cn" regions are included.
zu.aws.region().parse("us-east-1");
```

### codec

The `zu.codec` module contains codecs.

#### csv

The `zu.codec.csv()` utility is a codec transforming a string into an array of string using the string `split` method
to do so. It uses `zu.codec.stringSplit(",")` internally.

```typescript
import { zu } from "@infra-blocks/zod-utils";

const items = zu.codec.csv().parse("one,two,three"); // items is ["one", "two", "three"]
```

#### jsonParse

The `zu.codec.jsonParse(schema)` utility is a factory returning a codec where the first schema is
`zu.string.json()` and the second one is the one provided as input. This is almost verbatim
what is describe in [Zod's documentation](https://zod.dev/codecs#jsonschema).

#### ms

The `zu.codec.ms(options)` utility is a factory returning a codec where the schemas are
`z.string()` and `z.number()`. The transformations in both directions are handled by the
[ms](https://www.npmjs.com/package/ms) package. When encoding, the codec passes the options
provided to `ms(number, options)`.

```typescript
import { zu } from "@infra-blocks/zod-utils";

const item: number = zu.codec.ms().parse("1d"); // item is 86400000.
zu.codec.ms({ long: true }).encode(item); // result is "1 day".
```

#### stringSplit

The `zu.codec.stringSplit(separator)` utility is a factory returning a codec where the first schema is
`z.string()`, the second schema is `z.array(z.string())`, and the transformations back and forth
are accomplished using `String.split` and `Array.join` respectively, using the provided separator.

#### stringToBuffer

The `zu.codec.stringToBuffer(encoding)` utility is a factory returning a codec where the first
schema is `z.string()`, the secon schema is `z.instanceof(Buffer)`, and the transformations
back and forth are accomplished using `Buffer.from` and `buffer.toString` with the provided
encoding.

```typescript
import { zu } from "@infra-blocks/zod-utils";

// Defaults to utf-8, because Buffer functions default to utf-8.
const utf8Codec = zu.codec.stringToBuffer();
// A specific encoding can be provided.
const base64Codec = zu.codec.stringToBuffer("base64");

utf8Codec.parse("1234"); // Returns Buffer.from("1234");
base64codec.parse("1234"); // Returns Buffer.from("1234", "base64");
```

#### stringToInteger

The `zu.codec.stringToInteger()` codec is taken almost verbatim
from [Zod's own documentation](https://zod.dev/codecs#stringtoint). The
only difference is the final type is branded as it is using `zu.integer()` internally.

```typescript
import { zu } from "@infra-blocks/zod-utils";
import { Integer } from "@infra-blocks/zod-utils";

const item: Integer = zu.codec.stringToInteger().parse("1234");
```

#### stringToJson

The `zu.codec.stringToJson()` codec transforms a string into JSON using JSON.parse.
It uses `zu.codec.jsonParse(zu.json())` internally.

```typescript
import { zu } from "@infra-blocks/zod-utils";

const item: zu.Json = zu.codec.stringToJson().parse('[1, "word", null]');
```

#### stringToUrl

The `zu.codec.stringToUrl()` codec is taken [Zod's own documentation](https://zod.dev/codecs#stringtourl).
The result is a URL object. No branding here esé.

```typescript
import { zu } from "@infra-blocks/zod-utils";

const item: URL = zu.codec.stringToUrl().parse("http://localhost:3000");
```

### geojson

The `geojson` module contains utilities to validate GeoJSON objects.

```typescript
import { zu } from "@infra-blocks/zod-utils";

// Supports all GeoJSON types.
// All geometries are supported.
zu.geojson().parse({
  type: "Point",
  coordinates: [1, 2]
});
// Features
zu.geojson().parse({
  type: "Feature",
  geometry: {
    type: "LineString",
    // Works with 3d coordinates too.
    coordinates: [[1, 2, 3], [4, 4, 6]]
  },
  // Either null or a JSON object.
  properties: {
    name: "BigFeature"
  }
});
// Feature collections
zu.geojson().parse({
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [[[1, 2], [2, 2], [2, 1], [1, 1]]]
      },
      properties: {
        name: "BroSquare"
      }
    }
  ]
});
```

#### Sub schemas & Types

For convenience, the module also exports sub schemas and types. This way, a user can pick and choose which schemas
they specifically need in their context, or which ones they'd like to extend and customize.

```typescript
import {zu} from "@infra-blocks/zod-utils";

const boundingBoxSchema = zu.geojson.boundingBox();
const boundingBox: zu.GeoJsonBoundingBox = boundingBoxSchema.parse({...});

const featureSchema = zu.geojson.feature();
const feature: zu.GeoJsonFeature = featureSchema.parse({...});

const featureCollectionSchema = zu.geojson.featureCollection();
const featureCollection: zu.GeoJsonFeatureCollection = featureCollectionSchema.parse({...});

const geometryCollectionSchema = zu.geojson.geometryCollection();
const geometryCollection: zu.GeoJsonGeometryCollection = geometryCollectionSchema.parse({...});

const lineStringSchema = zu.geojson.lineString();
const lineString: zu.GeoJsonLineString = lineStringSchema.parse({...});

const multiLineStringSchema = zu.geojson.multiLineString();
const multiLineString: zu.GeoJsonMultiLineString = multiLineStringSchema.parse({...});

const multiPointSchema = zu.geojson.multiPoint();
const multiPoint: zu.GeoJsonMultiPoint = multiPointSchema.parse({...});

const multiPolygonSchema = zu.geojson.multiPolygon();
const multiPolygon: zu.GeoJsonMultiPolygon = multiPolygonSchema.parse({...});

const pointSchema = zu.geojson.point();
const point: zu.GeoJsonPoint = pointSchema.parse({...});

const polygonSchema = zu.geojson.polygon();
const polygon: zu.GeoJsonPolygon = polygonSchema.parse({...});

const coordinateSchema = zu.geojson.coordinate();
const coordinate: zu.GeoJsonCoordinate = coordinateSchema.parse([1, 2]);
```

#### Design considerations

##### Empty coordinates arrays

The module follows the [spec](https://datatracker.ietf.org/doc/html/rfc7946). Note that the spec states the
following:

> GeoJSON processors MAY interpret Geometry objects with
empty "coordinates" arrays as null objects. 

This module tolerates empty coordinates arrays where the spec doesn't explicitly state that it must not be empty.
For example, the following won't throw:
```typescript
zu.geojson().parse({
  type: "MultiLineString",
  coordinates: []
});
```

However, the following will throw because the spec explicitly states the coordinates must contain at least two
positions:
```typescript
zu.geojson().parse({
  type: "LineString",
  coordinates: []
});
```

This behaviour could become configurable in a future version with a stricter default approach.

##### Properties

GeoJSON features must have properties. Those properties are either null or a JSON object. This module uses
the `json` module to validate the properties. This means that the following will throw:
```typescript
zu.geojson().parse({
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [1, 2]
  },
  properties: {
    notJson: new Map()
  }
});
```

### inferBrand

The `zu.inferBrand<T>` type utility extracts the brand(s) from a given type. It resolves to `never` if the
type is not branded. It unionizes the brands if more than one exists.

```typescript
import { z } from "zod";
import { zu } from "@infra-blocks/zod-utils";

type Never = zu.inferBrand<string>; // Resolves to never.
type StringBrand = zu.inferBrand<number & z.$brand<"Toto">>; // Resolves to "Toto".
type UnionBrands = zu.inferBrand<number & z.$brand<"Toto"> & z.$brand<5>>; // Resolves to "Toto" | 5.
```

### iso

The `iso` module is an extension of `zod`'s own `iso` module. All schemas return [branded types](#branded-types).

```typescript
import { zu } from "@infra-blocks/zod-utils";

zu.iso.currencyCode().parse("USD");
zu.iso.currencyCode().parse("CAD");

zu.iso.countryCode.alpha3("USA"); // The greatest country on earth.
zu.iso.countryCode.alpha3("CAN"); // Its communist little brother.
```

### json

The `json` module contains utilities to validate JSON objects, arrays and primitives.

````typescript
import { zu } from "@infra-blocks/zod-utils";

// Works with any scalar
zu.json().parse(0); 
zu.json().parse("hello"); 
zu.json().parse(true); 
zu.json().parse(null); 
// With arrays and objects too.
zu.json().parse([1, "bye", false, null, ["nested"]]); 
zu.json().parse({
  number: 42,
  string: "hello again, I guess",
  boolean: true,
  null: null,
  array: [1, "bye", false, null],
  nested: {
    someField: "you get it"
  }
});
// Throws for bullshit.
zu.json().parse(undefined); // Boom.
zu.json().parse(Symbol("nope")); // Boom.
zu.json().parse(new Set()); // Boom.
// etc...
````

#### Sub schemas & Types

```typescript
import { zu } from "@infra-blocks/zod-utils";

// Want to parse a JSON primitive?
const jsonPrimitive: zu.JsonPrimitive = zu.json.primitive().parse(5);
// Will throw for anything that is not a JSON primitive.
zu.json.primitive().parse([]); // Boom.
zu.json.primitive().parse({}); // Boom.
zu.json.primitive().parse(undefined); // Boom.

// A JSON array maybe?
const jsonArray: zu.JsonArray = zu.json.array().parse([1, 2, 3]);
// Will throw for anything that is not a JSON array.
zu.json.array().parse(5); // Boom.
zu.json.array().parse({}); // Boom.

// And finally, what about making sure you get a JSON object?
const jsonObject: zu.JsonObject = zu.json.object().parse({ hello: "world" });
// You know it by now, but just to make sure.
zu.json.object().parse(5); // Boom.
zu.json.object().parse([]); // Boom.
```

### number

The `zu.number` module exports utilities for parsing numbers. All schemas return [branded types](#branded-types).

#### integer

`zu.number.integer()` produces a [branded type](#branded-types) using `z.int()` internally.

```typescript
import { zu } from "@infra-blocks/zod-utils";

function expectsInteger(x: zu.Integer) {
  // Do some bull here.
}

expectsInteger(zu.number.integer().parse(42));
```

#### positiveInteger

`zu.number.positiveInteger()` produces a [branded type](#branded-types). It using `z.int().min(0)` internally.

```typescript
import { zu } from "@infra-blocks/zod-utils";

function doingBull(x: zu.PositiveInteger) {
  // Do some bull here.
}

doingBull(zu.number.positiveInteger().parse(42));
```

### string

The `zu.string` module exposes schemas for manipulating strings. All schemas return [branded types](#branded-types).
Which means, their result can be used as strings anywhere, but strings cannot be used in place of the corresonding
type.

#### base64url

```typescript
import { zu } from "@infra-blocks/zod-utils";
import { expectTypeOf } from "expect-type";

const result = zu.string.base64url().parse("w6p0cmUgb3UgbmUgcGFzIMOqdHJlIGVzdGk_");
expectTypeOf(result).toEqualTypeOf<zu.IntegerString>();
expect(result).to.equal("w6p0cmUgb3UgbmUgcGFzIMOqdHJlIGVzdGk_");
```

#### integer

```typescript
import { zu } from "@infra-blocks/zod-utils";
import { expectTypeOf } from "expect-type";

// Uses z.string().regex(z.regexes.integer) internally.
const result = zu.string.integer().parse("1234");
expectTypeOf(result).toEqualTypeOf<zu.IntegerString>();
expect(result).to.equal("1234");
```

#### json

```typescript
import { zu } from "@infra-blocks/zod-utils";
import { expectTypeOf } from "expect-type";

const result = zu.string.json().parse('[1, "word", null]');
expectTypeOf(result).toEqualTypeOf<zu.UrlString>();
expect(result).to.equal('[1, "word", null]');
```

#### number

```typescript
import { zu } from "@infra-blocks/zod-utils";
import { expectTypeOf } from "expect-type";

// Uses z.string().regex(z.regexes.number) internally.
const result = zu.string.integer().parse("1234.5678");
expectTypeOf(result).toEqualTypeOf<zu.NumberString>();
expect(result).to.equal("1234.5678");
```

### typeGuard

The `typeGuard` utility allows to obtain a function that will act as a type guard for the type
that the wrapped schema outputs. It is most useful with branded types, where the information
about the rules of the type is contained within it. Example:

```typescript
import { z } from "zod";
import { zu } from "@infra-blocks/zod-utils";
import { expectTypeOf } from "expect-type";

export type Min5String = z.infer<typeof schema>;

const schema = z.string().min(5).brand("Min5String");
const isMin5String = zu.typeGuard(schema);
const myString = "toto-stfu";
if (isMin5String(myString)) {
  // Here, the type of myString extends Min5String (it's actually `"toto-stfu" & z.$brand<"Min5String">`
  // instead of `string & z.$brand<"Min5String">`)
  expectTypeOf(myString).toExtend<Min5String>();
} else {
  expectTypeOf(myString).toEqual<"toto-stfu">();
}
```

### Is Valid

The `isValid` API is very similar to the [type guard](#type-guard) one, except it doesn't bind
to a schema. The schema is passed as argument. Where you would write `zu.typeGuard(schema)(value)`,
you instead write `zu.isValid(schema, value)`. Both behave the same and narrow the result type.
