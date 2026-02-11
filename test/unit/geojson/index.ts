import type { TestContext } from "node:test";
import { boundingBoxTests } from "./bounding-box.js";
import { positionTests } from "./coordinate.js";
import { featureTests } from "./feature.js";
import { featureCollectionTests } from "./feature-collection.js";
import { geojsonTests } from "./geojson.js";
import { geometryCollectionTests } from "./geometry-collection.js";
import { lineStringTests } from "./line-string.js";
import { multiLineStringTests } from "./multi-line-string.js";
import { multiPointTests } from "./multi-point.js";
import { multiPolygonTests } from "./multi-polygon.js";
import { pointTests } from "./point.js";
import { polygonTests } from "./polygon.js";

export async function injectGeoJsonTests(t: TestContext) {
  await t.test("geojson", async (t) => {
    await boundingBoxTests(t);
    await featureTests(t);
    await featureCollectionTests(t);
    await geometryCollectionTests(t);
    await geojsonTests(t);
    await lineStringTests(t);
    await multiLineStringTests(t);
    await multiPointTests(t);
    await multiPolygonTests(t);
    await pointTests(t);
    await polygonTests(t);
    await positionTests(t);
  });
}
