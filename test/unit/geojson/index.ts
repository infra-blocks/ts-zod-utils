import { boundingBoxTests } from "./bounding-box.js";
import { featureCollectionTests } from "./feature-collection.js";
import { featureTests } from "./feature.js";
import { geojsonTests } from "./geojson.js";
import { geometryCollectionTests } from "./geometry-collection.js";
import { lineStringTests } from "./line-string.js";
import { multiLineStringTests } from "./multi-line-string.js";
import { multiPointTests } from "./multi-point.js";
import { multiPolygonTests } from "./multi-polygon.js";
import { pointTests } from "./point.js";
import { polygonTests } from "./polygon.js";
import { positionTests } from "./coordinate.js";

export function injectGeoJsonTests() {
  describe("geojson", function () {
    boundingBoxTests();
    featureTests();
    featureCollectionTests();
    geometryCollectionTests();
    geojsonTests();
    lineStringTests();
    multiLineStringTests();
    multiPointTests();
    multiPolygonTests();
    pointTests();
    polygonTests();
    positionTests();
  });
}
