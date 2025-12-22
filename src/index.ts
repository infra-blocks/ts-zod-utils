import { z } from "zod";
import { json } from "./json/index.js";
import { geojson } from "./geojson/index.js";

const csvSchema = z.string().transform((str) => str.split(","));

function csv() {
  return csvSchema;
}

const zu = {
  geojson,
  json,
  csv,
};

export { zu };
