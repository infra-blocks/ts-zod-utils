import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";
import _ = require("lodash/fp");

export function geojsonTests() {
  const schema = zu.geojson();
  describe("valid values", function () {
    // We test all geometries once.
    it("should work with a geometry collection", function () {
      const value = {
        type: "GeometryCollection",
        geometries: [
          {
            type: "Point",
            coordinates: [1, 2],
          },
        ],
      };
      expect(schema.parse(value)).to.deep.equal(value);
    });
    it("should work with a line string", function () {
      const value = {
        type: "LineString",
        coordinates: [
          [1, 2],
          [3, 4],
        ],
      };
      expect(schema.parse(value)).to.deep.equal(value);
    });
    it("should work with a multi-line string", function () {
      const value = {
        type: "MultiLineString",
        coordinates: [
          [
            [1, 2],
            [3, 4],
          ],
        ],
      };
      expect(schema.parse(value)).to.deep.equal(value);
    });
    it("should work with a multi-point", function () {
      const value = {
        type: "MultiPoint",
        coordinates: [[1, 2]],
      };
      expect(schema.parse(value)).to.deep.equal(value);
    });
    it("should work with a multi-polygon", function () {
      const value = {
        type: "MultiPolygon",
        coordinates: [[[[1, 2]]]],
      };
      expect(schema.parse(value)).to.deep.equal(value);
    });
    it("should work with a point", function () {
      const value = {
        type: "Point",
        coordinates: [1, 2],
      };
      expect(schema.parse(value)).to.deep.equal(value);
    });
    it("should work with a polygon", function () {
      const value = {
        type: "Polygon",
        coordinates: [[[1, 2]]],
      };
      expect(schema.parse(value)).to.deep.equal(value);
    });
    // One feature.
    it("should work with a feature", function () {
      const value = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [1, 2],
        },
        properties: null,
      };
      expect(schema.parse(value)).to.deep.equal(value);
    });
    // One feature collection.
    it("should work with a feature collection", function () {
      const value = {
        type: "FeatureCollection",
        features: [],
      };
      expect(schema.parse(value)).to.deep.equal(value);
    });
  });
  // Because the only discriminant is the type, we only test the type property. Each respective schema of the union is
  // tested into its own module.
  describe("invalid values", function () {
    const validValue = {
      type: "Point",
      coordinates: [1, 2],
    };

    it("should throw for missing type", function () {
      const value = _.omit("type", validValue);
      expect(() => schema.parse(value)).to.throw();
    });
    it("should throw for invalid type", function () {
      const value = {
        ...validValue,
        type: "BigGeoJson",
      };
      expect(() => schema.parse(value)).to.throw();
    });
    it("should throw for extra properties", function () {
      const value = {
        ...validValue,
        extra: "boom",
      };
      expect(() => schema.parse(value)).to.throw();
    });
  });
}
