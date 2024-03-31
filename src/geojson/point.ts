import { z } from "zod";
import { schemaWithBoundingBox } from "./base.js";
import { coordinate } from "./coordinate.js";

const pointSchema = schemaWithBoundingBox.extend({
  type: z.literal("Point"),
  coordinates: coordinate(),
});

export type GeoJsonPoint = z.infer<typeof pointSchema>;

export function point() {
  return pointSchema;
}
