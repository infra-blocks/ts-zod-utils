import type { z } from "zod";

// TODO: not exporting this one yet, as I haven't been able to make it work with
// a double brand.
/**
 * A type utility that removes the brand from T.
 *
 * If T extends string & z.$brand<"BigToto">, then zu.unbranded<T> = T.
 * Otherwise, zu.unbranded<T> = T.
 */
export type Unbranded<T> =
  T extends z.$brand<infer B> ? Omit<T, keyof z.$brand<B>> : T;
