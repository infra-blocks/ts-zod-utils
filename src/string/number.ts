import { z } from "zod";

const schema = z.string().regex(z.regexes.number).brand("NumberString");

export type NumberString = z.infer<typeof schema>;

/**
 * @returns A schema that uses `z.string().regex(z.regexes.number)` internally and returns an {@link NumberString}
 * upon success.
 */
export const number = () => schema;
