import { z } from "zod";

const schema = z.url().brand("UrlString");

export type UrlString = z.infer<typeof schema>;

/**
 * @returns A schema that uses `z.string().regex(z.regexes.integer)` internally and returns an {@link UrlString}
 * upon success.
 */
export const url = () => schema;
