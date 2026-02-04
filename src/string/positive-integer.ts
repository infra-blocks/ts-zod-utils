import { z } from "zod";

const schema = z.string().regex(/^\d+$/).brand("PositiveIntegerString");

export type PositiveIntegerString = z.infer<typeof schema>;

/**
 * @returns A schema that uses `z.string().regex(...)` internally and returns a {@link PositiveIntegerString}
 * upon success.
 */
export const positiveInteger = () => schema;
