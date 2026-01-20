import { csv } from "./csv.js";
import { jsonParse } from "./json-parse.js";
import { stringtoInteger } from "./string-to-integer.js";
import { stringToJson } from "./string-to-json.js";
import { stringToUrl } from "./string-to-url.js";

const codec = {
  csv,
  jsonParse,
  stringtoInteger,
  stringToJson,
  stringToUrl,
};

export { codec };
