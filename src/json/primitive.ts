import { z } from "zod";

const schema = z.union([z.string(), z.number(), z.boolean(), z.null()]);

export type JsonPrimitive = z.infer<typeof schema>;

export const primitive = () => schema;
