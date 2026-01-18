import { z } from "zod";

export type Integer = z.infer<typeof integerSchema>;

const integerSchema = z.int().brand("Integer");

export const integer = () => integerSchema;
