import { z } from "zod";
import { type Json, json } from "./json.js";

const schema = z.array(json());

export type JsonArray = Array<Json>;

export const array = () => schema;
