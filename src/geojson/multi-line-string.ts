import { z } from "zod";
import { schemaWithBoundingBox } from "./base.js";
import { lineString } from "./line-string.js";

const multiLineStringSchema = schemaWithBoundingBox.extend({
  type: z.literal("MultiLineString"),
  coordinates: z.array(lineString().shape.coordinates),
});

export type GeoJsonMultiLineString = z.infer<typeof multiLineStringSchema>;

export function multiLineString() {
  return multiLineStringSchema;
}
