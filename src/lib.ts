// Utilities in this module are internal.
import type { z } from "zod";

// TODO: ts-types.
export function trusted<T>(value: unknown): T {
  return value as T;
}

// TODO: zu.brand & zu.unbranded
type Brand<T> = T extends z.$brand<infer B> ? B : never;
export type Unbranded<T> = T extends infer U & z.$brand<Brand<T>>
  ? Unbranded<U>
  : T;
