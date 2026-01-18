import { z } from "zod";

const schema = z.string().regex(z.regexes.integer).brand("IntegerString");

export type IntegerString = z.infer<typeof schema>;

/**
 * @returns A schema that uses `z.string().regex(z.regexes.integer)` internally and returns an {@link IntegerString}
 * upon success.
 */
export const integer = () => schema;
