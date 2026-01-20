import { csv } from "./csv.js";
import { jsonParse } from "./json-parse.js";
import { stringToInteger } from "./string-to-integer.js";
import { stringToJson } from "./string-to-json.js";
import { stringToUrl } from "./string-to-url.js";

const codec = {
  csv,
  jsonParse,
  stringtoInteger: stringToInteger,
  stringToJson,
  stringToUrl,
};

export { codec };
