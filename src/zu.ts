import type { z } from "zod";

export { aws } from "./aws/index.js";
export { codec } from "./codec/index.js";
export { geojson } from "./geojson/index.js";
export { isValid } from "./is-valid.js";
export { iso } from "./iso/index.js";
export { json } from "./json/index.js";
export { number } from "./number/index.js";
export { string } from "./string/index.js";
export { typeGuard } from "./type-guard.js";

/**
 * A type utility that infers the brand of a branded type.
 *
 * If T extends string & z.$brand<"BigToto">, then
 * zu.interBrand<T> = "BigToto";
 *
 * If T is not branded, then this type utility resolves to `never`.
 */
export type inferBrand<T> = T extends z.$brand<infer B> ? B : never;
