import { z } from "zod";
import { schemaWithBoundingBox } from "./base.js";
import { feature } from "./feature.js";

const featureCollectionSchema = schemaWithBoundingBox.extend({
  type: z.literal("FeatureCollection"),
  features: z.array(feature()),
});

export type GeoJsonFeatureCollection = z.infer<typeof featureCollectionSchema>;

export function featureCollection() {
  return featureCollectionSchema;
}
