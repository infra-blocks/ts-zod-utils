import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export function featureTests() {
  describe(zu.geojson.feature.name, () => {
    const schema = zu.geojson.feature();
    describe("valid values", () => {
      it("should work with null geometry", () => {
        const value = {
          type: "Feature",
          geometry: null,
          properties: null,
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with a string id", () => {
        const value = {
          type: "Feature",
          id: "big-feature-id",
          geometry: null,
          properties: null,
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with a number id", () => {
        const value = {
          type: "Feature",
          id: 42,
          geometry: null,
          properties: null,
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with empty properties", () => {
        const value = {
          type: "Feature",
          geometry: null,
          properties: {},
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with any properties", () => {
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
      it("should work with a line string", () => {
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
      it("should work with a multi-line string", () => {
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
      it("should work with a multi-point", () => {
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
      it("should work with a multi-polygon", () => {
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
      it("should work with a point", () => {
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
      it("should work with a polygon", () => {
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
      it("should work with a geometry collection", () => {
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
    describe("invalid values", () => {
      const validValue = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [1, 2],
        },
        properties: null,
      };

      it("should throw for missing type", () => {
        const { type: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for invalid type", () => {
        const value = {
          ...validValue,
          type: "BigFeature",
        };
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for missing geometry", () => {
        const { geometry: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for invalid geometry", () => {
        const value = {
          ...validValue,
          geometry: {
            type: "BigGeometry",
            coordinates: [1, 2],
          },
        };
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for missing properties", () => {
        const { properties: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for properties that aren't an object", () => {
        const value = {
          ...validValue,
          properties: "not an object",
        };
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for properties that aren't a valid json object", () => {
        const value = {
          ...validValue,
          properties: {
            key: new Set(),
          },
        };
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for null id", () => {
        const value = {
          ...validValue,
          id: null,
        };
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for invalid id", () => {
        const value = {
          ...validValue,
          id: false,
        };
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for extra properties", () => {
        const value = {
          ...validValue,
          extra: "boom",
        };
        expect(() => schema.parse(value)).to.throw();
      });
    });
  });
}
