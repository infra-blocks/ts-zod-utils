import { z } from "zod";
import { boundingBox } from "./bounding-box.js";

export const schemaWithBoundingBox = z.strictObject({
  bbox: boundingBox().optional(),
});
