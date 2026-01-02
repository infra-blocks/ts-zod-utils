import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export function multiPolygonTests() {
  describe(zu.geojson.multiPolygon.name, () => {
    const schema = zu.geojson.multiPolygon();
    describe("valid values", () => {
      it("should work with empty coordinates", () => {
        const value = {
          type: "MultiPolygon",
          coordinates: [],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with one empty polygon", () => {
        const value = {
          type: "MultiPolygon",
          coordinates: [[]],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with one polygon with empty outer ring coordinates", () => {
        const value = {
          type: "MultiPolygon",
          coordinates: [[[]]],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with two-dimensional coordinates", () => {
        const value = {
          type: "MultiPolygon",
          coordinates: [[[[1, 2]]]],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with three-dimensional coordinates", () => {
        const value = {
          type: "MultiPolygon",
          coordinates: [[[[1, 2, 3]]]],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
    });
    describe("invalid values", () => {
      const validValue = {
        type: "MultiPolygon",
        coordinates: [[[[1, 2]]]],
      };

      it("should throw for missing type", () => {
        const { type: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for invalid type", () => {
        const value = {
          ...validValue,
          type: "BigMultiPolygon",
        };
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for missing coordinates", () => {
        const { coordinates: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for single tuple outer ring coordinates", () => {
        const value = {
          ...validValue,
          coordinates: [[[[1]]]],
        };
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for extra properties", () => {
        const value = {
          ...validValue,
          extra: "extra",
        };
        expect(() => schema.parse(value)).to.throw();
      });
    });
  });
}
