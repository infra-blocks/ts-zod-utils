import { GeoJsonBoundingBox, boundingBox } from "./bounding-box.js";
import {
  featureCollection,
  GeoJsonFeatureCollection,
} from "./feature-collection.js";
import { GeoJsonFeature, feature } from "./feature.js";
import { GeoJson, geojson } from "./geojson.js";
import { GeoJsonGeometry, geometryCollection } from "./geometry.js";
import { GeoJsonLineString, lineString } from "./line-string.js";
import {
  GeoJsonMultiLineString,
  multiLineString,
} from "./multi-line-string.js";
import { GeoJsonMultiPoint, multiPoint } from "./multi-point.js";
import { GeoJsonMultiPolygon, multiPolygon } from "./multi-polygon.js";
import { GeoJsonPoint, point } from "./point.js";
import { GeoJsonPolygon, polygon } from "./polygon.js";
import { GeoJsonCoordinate, coordinate } from "./coordinate.js";

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
