# ts-zod-utils
[![Build](https://github.com/infra-blocks/ts-zod-utils/actions/workflows/build.yml/badge.svg)](https://github.com/infra-blocks/ts-zod-utils/actions/workflows/build.yml)
[![Release](https://github.com/infra-blocks/ts-zod-utils/actions/workflows/release.yml/badge.svg)](https://github.com/infra-blocks/ts-zod-utils/actions/workflows/release.yml)
[![Update From Template](https://github.com/infra-blocks/ts-zod-utils/actions/workflows/update-from-template.yml/badge.svg)](https://github.com/infra-blocks/ts-zod-utils/actions/workflows/update-from-template.yml)
[![codecov](https://codecov.io/gh/infra-blocks/ts-zod-utils/graph/badge.svg?token=vyI1qM1EZg)](https://codecov.io/gh/infra-blocks/ts-zod-utils)

This package exposes various utilities extending the [zod](https://www.npmjs.com/package/zod) package.

## API

- [geojson](#geojson)
- [json](#json)

### GeoJson

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
import {
  GeoJson,
  GeoJsonBoundingBox,
  GeoJsonFeature,
  GeoJsonFeatureCollection,
  GeoJsonGeometryCollection,
  GeoJsonLineString,
  GeoJsonMultiLineString,
  GeoJsonMultiPoint,
  GeoJsonMultiPolygon,
  GeoJsonPoint,
  GeoJsonPolygon,
  GeoJsonCoordinate
} from "@infra-blocks/zod-utils/geojson";

const boundingBoxSchema = zu.geojson.boundingBox();
const boundingBox: GeoJsonBoundingBox = boundingBoxSchema.parse({...});

const featureSchema = zu.geojson.feature();
const feature: GeoJsonFeature = featureSchema.parse({...});

const featureCollectionSchema = zu.geojson.featureCollection();
const featureCollection: GeoJsonFeatureCollection = featureCollectionSchema.parse({...});

const geometryCollectionSchema = zu.geojson.geometryCollection();
const geometryCollection: GeoJsonGeometryCollection = geometryCollectionSchema.parse({...});

const lineStringSchema = zu.geojson.lineString();
const lineString: GeoJsonLineString = lineStringSchema.parse({...});

const multiLineStringSchema = zu.geojson.multiLineString();
const multiLineString: GeoJsonMultiLineString = multiLineStringSchema.parse({...});

const multiPointSchema = zu.geojson.multiPoint();
const multiPoint: GeoJsonMultiPoint = multiPointSchema.parse({...});

const multiPolygonSchema = zu.geojson.multiPolygon();
const multiPolygon: GeoJsonMultiPolygon = multiPolygonSchema.parse({...});

const pointSchema = zu.geojson.point();
const point: GeoJsonPoint = pointSchema.parse({...});

const polygonSchema = zu.geojson.polygon();
const polygon: GeoJsonPolygon = polygonSchema.parse({...});

const coordinateSchema = zu.geojson.coordinate();
const coordinate: GeoJsonCoordinate = coordinateSchema.parse([1, 2]);
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

### JSON

The `json` module contains utilities to validate JSON objects and stringified JSON objects.

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

// You can also parse stringified JSON!
zu.json.stringified().parse("5"); // Returns the number 5.
zu.json.stringified().parse('"JSON string"'); // Returns "JSON string". Note the quotes were removed.
zu.json.stringified().parse(JSON.strinfify({ field: "value" })); // Returns {field: "value"}.
````

#### Sub schemas & Types

```typescript
import { zu } from "@infra-blocks/zod-utils";
import { Json, JsonArray, JsonObject, JsonPrimitive } from "@infra-blocks/zod-utils/json";

// The type hints are used just to showcase their usage. They aren't necessary when parsing.
// Want to parse a JSON primitive?
const jsonPrimitive: JsonPrimitive = zu.json.primitive().parse(5);
// Will throw for anything that is not a JSON primitive.
zu.json.primitive().parse([]); // Boom.
zu.json.primitive().parse({}); // Boom.
zu.json.primitive().parse(undefined); // Boom.

// A JSON array maybe?
const jsonArray: JsonArray = zu.json.array().parse([1, 2, 3]);
// Will throw for anything that is not a JSON array.
zu.json.array().parse(5); // Boom.
zu.json.array().parse({}); // Boom.

// And finally, what about making sure you get a JSON object?
const jsonObject: JsonObject = zu.json.object().parse({ hello: "world" });
// You know it by now, but just to make sure.
zu.json.object().parse(5); // Boom.
zu.json.object().parse([]); // Boom.
```
