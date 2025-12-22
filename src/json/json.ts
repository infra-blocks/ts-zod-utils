import { z } from "zod";

const primitiveSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
]);
export type JsonPrimitive = z.infer<typeof primitiveSchema>;
export function primitive() {
  return primitiveSchema;
}

export type JsonObject = { [key: string]: Json };
export type JsonArray = Array<Json>;
export type Json = JsonPrimitive | JsonObject | JsonArray;

const jsonSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([primitive(), z.array(jsonSchema), z.record(z.string(), jsonSchema)])
);
export function json() {
  return jsonSchema;
}

const objectSchema = z.record(z.string(), jsonSchema);
export function object() {
  return objectSchema;
}

const arraySchema = z.array(jsonSchema);
export function array() {
  return arraySchema;
}

export const stringifiedJsonSchema: z.ZodType<Json, string> = z
  .string()
  .transform((str, ctx) => {
    try {
      return JSON.parse(str) as Json;
    } catch (e) {
      ctx.addIssue({ code: "custom", message: "Invalid JSON" });
      return z.NEVER;
    }
  });

export function stringifiedJson() {
  return stringifiedJsonSchema;
}
