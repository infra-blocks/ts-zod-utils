import { z } from "zod";

const schema = z.int().brand("Integer");

export type Integer = z.infer<typeof schema>;

export const integer = () => schema;
