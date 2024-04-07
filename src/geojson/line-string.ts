import { z } from "zod";
import { schemaWithBoundingBox } from "./base.js";
import { coordinate } from "./coordinate.js";

const lineStringSchema = schemaWithBoundingBox.extend({
  type: z.literal("LineString"),
  coordinates: z.array(coordinate()).min(2),
});

export type GeoJsonLineString = z.infer<typeof lineStringSchema>;

export function lineString() {
  return lineStringSchema;
}
