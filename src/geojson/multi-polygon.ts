import { z } from "zod";
import { schemaWithBoundingBox } from "./base.js";
import { polygon } from "./polygon.js";

const multiPolygonSchema = schemaWithBoundingBox.extend({
  type: z.literal("MultiPolygon"),
  coordinates: z.array(polygon().shape.coordinates),
});

export type GeoJsonMultiPolygon = z.infer<typeof multiPolygonSchema>;

export function multiPolygon() {
  return multiPolygonSchema;
}
