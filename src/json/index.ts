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
