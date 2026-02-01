import type { z } from "zod";

export * from "./aws/index.js";
export * from "./codec/index.js";
export * from "./geojson/index.js";
export { isValid } from "./is-valid.js";
export * from "./iso/index.js";
export * from "./json/index.js";
export * from "./number/index.js";
export * from "./string/index.js";
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
