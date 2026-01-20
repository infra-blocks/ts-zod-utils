import { z } from "zod";
import { type Json, json } from "./json.js";

const schema = z.record(z.string(), json());

export type JsonObject = { [key: string]: Json };

export const object = () => schema;
