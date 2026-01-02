import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export function multiPointTests() {
  describe(zu.geojson.multiPoint.name, function () {
    const schema = zu.geojson.multiPoint();
    describe("valid values", function () {
      it("should work with empty coordinates", function () {
        const value = {
          type: "MultiPoint",
          coordinates: [],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with two-dimensional coordinates", function () {
        const value = {
          type: "MultiPoint",
          coordinates: [[1, 2]],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with three-dimensional coordinates", function () {
        const value = {
          type: "MultiPoint",
          coordinates: [[1, 2, 3]],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
    });
    describe("invalid values", function () {
      const validValue = {
        type: "MultiPoint",
        coordinates: [[1, 2]],
      };

      it("should throw for missing type", function () {
        const { type: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for invalid type", function () {
        const value = {
          ...validValue,
          type: "BigMultiPoint",
        };
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for missing coordinates", function () {
        const { coordinates: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for invalid coordinates", function () {
        const value = {
          ...validValue,
          coordinates: [1, 2],
        };
        expect(() => schema.parse(value)).to.throw();
      });
    });
  });
}
