import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export function polygonTests() {
  describe(zu.geojson.polygon.name, function () {
    const schema = zu.geojson.polygon();
    describe("valid values", function () {
      it("should work with empty coordinates", function () {
        const value = {
          type: "Polygon",
          coordinates: [],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with empty outer ring coordinates", function () {
        const value = {
          type: "Polygon",
          coordinates: [[]],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with two-dimensional coordinates", function () {
        const value = {
          type: "Polygon",
          coordinates: [[[1, 2]]],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with three-dimensional coordinates", function () {
        const value = {
          type: "Polygon",
          coordinates: [[[1, 2, 3]]],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
    });
    describe("invalid values", function () {
      const validValue = {
        type: "Polygon",
        coordinates: [[[1, 2]]],
      };

      it("should throw for missing type", function () {
        const { type: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for invalid type", function () {
        const value = {
          ...validValue,
          type: "BigPolygon",
        };
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for missing coordinates", function () {
        const { coordinates: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for single tuple outer ring coordinates", function () {
        const value = {
          ...validValue,
          coordinates: [[[1]]],
        };
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for extra properties", function () {
        const value = {
          ...validValue,
          extra: "property",
        };
        expect(() => schema.parse(value)).to.throw();
      });
    });
  });
}
