import { base64url } from "./base64url.js";
import { integer } from "./integer.js";
import { json } from "./json.js";
import { number } from "./number.js";
import { url } from "./url.js";

export const string = {
  base64url,
  integer,
  json,
  number,
  url,
};
export type { Base64UrlString } from "./base64url.js";
export type { IntegerString } from "./integer.js";
export type { JsonString } from "./json.js";
export type { NumberString } from "./number.js";
export type { UrlString } from "./url.js";
