import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export function featureTests() {
  describe(zu.geojson.feature.name, function () {
    const schema = zu.geojson.feature();
    describe("valid values", function () {
      it("should work with null geometry", function () {
        const value = {
          type: "Feature",
          geometry: null,
          properties: null,
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with a string id", function () {
        const value = {
          type: "Feature",
          id: "big-feature-id",
          geometry: null,
          properties: null,
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with a number id", function () {
        const value = {
          type: "Feature",
          id: 42,
          geometry: null,
          properties: null,
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with empty properties", function () {
        const value = {
          type: "Feature",
          geometry: null,
          properties: {},
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with any properties", function () {
        const value = {
          type: "Feature",
          geometry: null,
          properties: {
            number: 1,
            string: "string",
            boolean: true,
            null: null,
            object: { key: "value" },
            array: [1, "two", false, null, { value: 3 }],
          },
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with a line string", function () {
        const value = {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [
              [1, 2],
              [2, 3],
            ],
          },
          properties: null,
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with a multi-line string", function () {
        const value = {
          type: "Feature",
          geometry: {
            type: "MultiLineString",
            coordinates: [
              [
                [1, 2],
                [2, 3],
              ],
            ],
          },
          properties: null,
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with a multi-point", function () {
        const value = {
          type: "Feature",
          geometry: {
            type: "MultiPoint",
            coordinates: [[1, 2]],
          },
          properties: null,
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with a multi-polygon", function () {
        const value = {
          type: "Feature",
          geometry: {
            type: "MultiPolygon",
            coordinates: [[[[1, 2]]]],
          },
          properties: null,
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with a point", function () {
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
      it("should work with a polygon", function () {
        const value = {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [[[1, 2]]],
          },
          properties: null,
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with a geometry collection", function () {
        const value = {
          type: "Feature",
          geometry: {
            type: "GeometryCollection",
            geometries: [
              {
                type: "MultiPoint",
                coordinates: [[1, 2]],
              },
            ],
          },
          properties: null,
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
    });
    describe("invalid values", function () {
      const validValue = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [1, 2],
        },
        properties: null,
      };

      it("should throw for missing type", function () {
        const { type: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for invalid type", function () {
        const value = {
          ...validValue,
          type: "BigFeature",
        };
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for missing geometry", function () {
        const { geometry: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for invalid geometry", function () {
        const value = {
          ...validValue,
          geometry: {
            type: "BigGeometry",
            coordinates: [1, 2],
          },
        };
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for missing properties", function () {
        const { properties: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for properties that aren't an object", function () {
        const value = {
          ...validValue,
          properties: "not an object",
        };
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for properties that aren't a valid json object", function () {
        const value = {
          ...validValue,
          properties: {
            key: new Set(),
          },
        };
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for null id", function () {
        const value = {
          ...validValue,
          id: null,
        };
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for invalid id", function () {
        const value = {
          ...validValue,
          id: false,
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
  });
}
