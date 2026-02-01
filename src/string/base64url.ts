import { z } from "zod";

const schema = z.base64url().brand("Base64UrlString");

export type Base64UrlString = z.infer<typeof schema>;

export const base64url = () => schema;
