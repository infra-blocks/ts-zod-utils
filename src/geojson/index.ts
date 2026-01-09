import { boundingBox } from "./bounding-box.js";
import { coordinate } from "./coordinate.js";
import { feature } from "./feature.js";
import { featureCollection } from "./feature-collection.js";
import { geojson } from "./geojson.js";
import { geometryCollection } from "./geometry.js";
import { lineString } from "./line-string.js";
import { multiLineString } from "./multi-line-string.js";
import { multiPoint } from "./multi-point.js";
import { multiPolygon } from "./multi-polygon.js";
import { point } from "./point.js";
import { polygon } from "./polygon.js";

const module = Object.assign(geojson, {
  boundingBox,
  feature,
  featureCollection,
  geometryCollection,
  lineString,
  multiLineString,
  multiPoint,
  multiPolygon,
  point,
  polygon,
  coordinate,
});

export { module as geojson };
