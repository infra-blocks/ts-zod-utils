import { z } from "zod";
import { schemaWithBoundingBox } from "./base.js";
import { point } from "./point.js";

const multiPointSchema = schemaWithBoundingBox.extend({
  type: z.literal("MultiPoint"),
  coordinates: z.array(point().shape.coordinates),
});

export type GeoJsonMultiPoint = z.infer<typeof multiPointSchema>;

export function multiPoint() {
  return multiPointSchema;
}
