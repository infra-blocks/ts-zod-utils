import { z } from "zod";

const twoDimensionalBoundingBox = z.tuple([
  z.number(),
  z.number(),
  z.number(),
  z.number(),
]);

const threeDimensionalBoundingBox = z.tuple([
  z.number(),
  z.number(),
  z.number(),
  z.number(),
  z.number(),
  z.number(),
]);

const boundingBoxSchema = z.union([
  twoDimensionalBoundingBox,
  threeDimensionalBoundingBox,
]);

export type GeoJsonBoundingBox = z.infer<typeof boundingBoxSchema>;

export function boundingBox() {
  return boundingBoxSchema;
}
