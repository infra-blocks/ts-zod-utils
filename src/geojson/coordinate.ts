import { z } from "zod";

const twoDimensionalCoordinate = z.tuple([z.number(), z.number()]);
const threeDimensionalCoordinate = z.tuple([
  z.number(),
  z.number(),
  z.number(),
]);

const schema = z.union([twoDimensionalCoordinate, threeDimensionalCoordinate]);

export type GeoJsonCoordinate = z.infer<typeof schema>;

export function coordinate() {
  return schema;
}
