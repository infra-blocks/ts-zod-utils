import { z } from "zod";

const schema = z
  .string()
  .refine(
    (s) => {
      try {
        JSON.parse(s);
        return true;
      } catch {
        return false;
      }
    },
    { error: "invalid JSON string" },
  )
  .brand("JsonString");

export type JsonString = z.infer<typeof schema>;

/**
 * @returns A schema that validates its input as a JSON string and returns a {@link JsonString}
 * upon success.
 */
export const json = () => schema;
