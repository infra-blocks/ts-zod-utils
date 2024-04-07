import { z } from "zod";
import { schemaWithBoundingBox } from "./base.js";
import { coordinate } from "./coordinate.js";

const polygonSchema = schemaWithBoundingBox.extend({
  type: z.literal("Polygon"),
  coordinates: z.array(z.array(coordinate())),
});

export type GeoJsonPolygon = z.infer<typeof polygonSchema>;

export function polygon() {
  return polygonSchema;
}
