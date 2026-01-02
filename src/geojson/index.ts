import { boundingBox, type GeoJsonBoundingBox } from "./bounding-box.js";
import { coordinate, type GeoJsonCoordinate } from "./coordinate.js";
import { feature, type GeoJsonFeature } from "./feature.js";
import {
  featureCollection,
  type GeoJsonFeatureCollection,
} from "./feature-collection.js";
import { type GeoJson, geojson } from "./geojson.js";
import { type GeoJsonGeometry, geometryCollection } from "./geometry.js";
import { type GeoJsonLineString, lineString } from "./line-string.js";
import {
  type GeoJsonMultiLineString,
  multiLineString,
} from "./multi-line-string.js";
import { type GeoJsonMultiPoint, multiPoint } from "./multi-point.js";
import { type GeoJsonMultiPolygon, multiPolygon } from "./multi-polygon.js";
import { type GeoJsonPoint, point } from "./point.js";
import { type GeoJsonPolygon, polygon } from "./polygon.js";

const module = (() => {
  function impl() {
    return geojson();
  }
  impl.boundingBox = boundingBox;
  impl.feature = feature;
  impl.featureCollection = featureCollection;
  impl.geometryCollection = geometryCollection;
  impl.lineString = lineString;
  impl.multiLineString = multiLineString;
  impl.multiPoint = multiPoint;
  impl.multiPolygon = multiPolygon;
  impl.point = point;
  impl.polygon = polygon;
  impl.coordinate = coordinate;
  return impl;
})();

export { module as geojson };
export type {
  GeoJsonBoundingBox,
  GeoJsonFeature,
  GeoJsonFeatureCollection,
  GeoJsonGeometry,
  GeoJson,
  GeoJsonLineString,
  GeoJsonMultiLineString,
  GeoJsonMultiPoint,
  GeoJsonMultiPolygon,
  GeoJsonPoint,
  GeoJsonPolygon,
  GeoJsonCoordinate,
};
