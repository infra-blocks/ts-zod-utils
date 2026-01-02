import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export function lineStringTests() {
  describe(zu.geojson.lineString.name, function () {
    const schema = zu.geojson.lineString();
    describe("valid values", function () {
      it("should work with two-dimensional coordinates", function () {
        const value = {
          type: "LineString",
          coordinates: [
            [1, 2],
            [3, 4],
          ],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with three-dimensional coordinates", function () {
        const value = {
          type: "LineString",
          coordinates: [
            [1, 2, 3],
            [4, 5, 6],
          ],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
    });
    describe("invalid values", function () {
      const validValue = {
        type: "LineString",
        coordinates: [
          [1, 2],
          [3, 4],
        ],
      };

      it("should throw for missing type", function () {
        const { type: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for invalid type", function () {
        const value = {
          ...validValue,
          type: "BigLineString",
        };
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for missing coordinates", function () {
        const { coordinates: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for empty coordinates", function () {
        const value = {
          ...validValue,
          coordinates: [],
        };
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for single coordinates", function () {
        const value = {
          ...validValue,
          coordinates: [[1, 2]],
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
