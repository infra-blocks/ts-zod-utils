import { z } from "zod";

const LITERAL_SCHEMA = z.union([z.string(), z.number(), z.boolean(), z.null()]);
type Literal = z.infer<typeof LITERAL_SCHEMA>;

type Json = Literal | { [key: string]: Json } | Json[];
const JSON_SCHEMA: z.ZodType<Json> = z.lazy(() =>
  z.union([LITERAL_SCHEMA, z.array(JSON_SCHEMA), z.record(JSON_SCHEMA)])
);
export function json() {
  return JSON_SCHEMA;
}

const JSON_FROM_STRING_SCHEMA: z.ZodType<Json, z.ZodTypeDef, string> = z
  .string()
  .transform((str, ctx) => {
    try {
      return JSON.parse(str) as Json;
    } catch (e) {
      ctx.addIssue({ code: "custom", message: "Invalid JSON" });
      return z.NEVER;
    }
  });

export function jsonFromString() {
  return JSON_FROM_STRING_SCHEMA;
}
