import { z } from "zod";
import type { JsonArray } from "./array.js";
import type { JsonObject } from "./object.js";
import { type JsonPrimitive, primitive } from "./primitive.js";

const schema: z.ZodType<Json> = z.lazy(() =>
  z.union([primitive(), z.array(schema), z.record(z.string(), schema)]),
);

export type Json = JsonPrimitive | JsonObject | JsonArray;

export const json = () => schema;

// TODO: codec stringToJson.
export const stringifiedJsonSchema: z.ZodType<Json, string> = z
  .string()
  .transform((str, ctx) => {
    try {
      return JSON.parse(str) as Json;
    } catch {
      ctx.addIssue({ code: "custom", message: "Invalid JSON" });
      return z.NEVER;
    }
  });

export function stringifiedJson() {
  return stringifiedJsonSchema;
}
