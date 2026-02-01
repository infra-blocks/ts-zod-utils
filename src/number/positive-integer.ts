import { z } from "zod";

const schema = z.int().min(0).brand("PositiveInteger");

export type PositiveInteger = z.infer<typeof schema>;

export const positiveInteger = () => schema;
