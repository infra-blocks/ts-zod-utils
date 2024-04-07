import { z } from "zod";
import { schemaWithBoundingBox } from "./base.js";
import { lineString } from "./line-string.js";
import { multiLineString } from "./multi-line-string.js";
import { multiPoint } from "./multi-point.js";
import { multiPolygon } from "./multi-polygon.js";
import { point } from "./point.js";
import { polygon } from "./polygon.js";

const geometryCollectionSchema: z.ZodType<GeoJsonGeometryCollection> =
  schemaWithBoundingBox.extend({
    type: z.literal("GeometryCollection"),
    geometries: z.lazy(() => z.array(geometry())),
  });

/*
Unlike the other exported types, this one is defined and not inferred because it is required as a type hint for
the schema. It is required because the "geometries" property is a circular reference to the "GeometryCollection"
type (via "geometry").
 */
export type GeoJsonGeometryCollection = z.infer<
  typeof schemaWithBoundingBox
> & {
  type: "GeometryCollection";
  geometries: Array<z.infer<typeof geometrySchema>>;
};

export function geometryCollection() {
  return geometryCollectionSchema;
}

const geometrySchema = z.union([
  lineString(),
  multiLineString(),
  multiPoint(),
  multiPolygon(),
  point(),
  polygon(),
  geometryCollection(),
]);

export type GeoJsonGeometry = z.infer<typeof geometrySchema>;

export function geometry() {
  return geometrySchema;
}
