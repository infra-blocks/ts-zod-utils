# ts-zod-utils
[![Build](https://github.com/infrastructure-blocks/ts-zod-utils/actions/workflows/build.yml/badge.svg)](https://github.com/infrastructure-blocks/ts-zod-utils/actions/workflows/build.yml)
[![NPM Publish Release From Label](https://github.com/infrastructure-blocks/ts-zod-utils/actions/workflows/npm-publish-release-from-label.yml/badge.svg)](https://github.com/infrastructure-blocks/ts-zod-utils/actions/workflows/npm-publish-release-from-label.yml)
[![Update From Template](https://github.com/infrastructure-blocks/ts-zod-utils/actions/workflows/update-from-template.yml/badge.svg)](https://github.com/infrastructure-blocks/ts-zod-utils/actions/workflows/update-from-template.yml)
[![codecov](https://codecov.io/gh/infrastructure-blocks/ts-zod-utils/graph/badge.svg?token=vyI1qM1EZg)](https://codecov.io/gh/infrastructure-blocks/ts-zod-utils)

This package exposes various utilities extending the [zod](https://www.npmjs.com/package/zod) package.

## API

- [json](#json)

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

// Inferred types are exported for convenience.
import { Json } from "@infra-blocks/zod-utils/json";

// Compiles.
const myJson: Json = { hello: "world" };
// Doesn't compile: undefined is not valid JSON.
const boom: Json = { nope: undefined };
````

The package also allows using sub schemas:

```typescript
import { zu } from "@infra-blocks/zod-utils";
import { JsonArray, JsonObject, JsonPrimitive } from "@infra-blocks/zod-utils/json";

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

Package publication is fully automated at the CI level. This repository leverages the
[npm-publish-from-label-workflow](https://github.com/infrastructure-blocks/npm-publish-from-label-workflow)
workflow as a turnkey, automated mechanism for publishing packages. Refer to its documentation for usage information.
