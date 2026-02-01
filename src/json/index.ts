import { array } from "./array.js";
import { json } from "./json.js";
import { object } from "./object.js";
import { primitive } from "./primitive.js";

const module = Object.assign(json, {
  array,
  object,
  primitive,
});

export { module as json };
export type { JsonArray } from "./array.js";
export type { Json } from "./json.js";
export type { JsonObject } from "./object.js";
export type { JsonPrimitive } from "./primitive.js";
