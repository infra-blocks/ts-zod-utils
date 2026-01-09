import { array, json, object, primitive, stringifiedJson } from "./json.js";

const module = Object.assign(json, {
  array,
  object,
  primitive,
  stringified: stringifiedJson,
});

export { module as json };
