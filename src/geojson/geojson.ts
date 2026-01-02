import { z } from "zod";
import { feature } from "./feature.js";
import { featureCollection } from "./feature-collection.js";
import { geometry } from "./geometry.js";

const geojsonSchema = z.union([geometry(), feature(), featureCollection()]);

export type GeoJson = z.infer<typeof geojsonSchema>;

export function geojson() {
  return geojsonSchema;
}
