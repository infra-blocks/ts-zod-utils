import { z } from "zod";
import { json } from "../json/index.js";
import { schemaWithBoundingBox } from "./base.js";
import { geometry } from "./geometry.js";

const featureSchema = schemaWithBoundingBox.extend({
  type: z.literal("Feature"),
  geometry: geometry().nullable(),
  id: z.union([z.string(), z.number()]).optional(),
  properties: z.record(json()).nullable(),
});

export type GeoJsonFeature = z.infer<typeof featureSchema>;

export function feature() {
  return featureSchema;
}
