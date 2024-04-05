import { z } from "zod";

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
export type Literal = z.infer<typeof literalSchema>;
export function literal() {
  return literalSchema;
}

export type Json = Literal | { [key: string]: Json } | Json[];
const jsonSchema: z.ZodType<Json> = z.lazy(() =>
  z.union([literal(), z.array(jsonSchema), z.record(jsonSchema)])
);
export function json() {
  return jsonSchema;
}

export const stringifiedJsonSchema: z.ZodType<Json, z.ZodTypeDef, string> = z
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
