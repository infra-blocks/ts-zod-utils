import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export function multiLineStringTests() {
  describe(zu.geojson.multiLineString.name, function () {
    const schema = zu.geojson.multiLineString();
    describe("valid values", function () {
      it("should work with empty coordinates", function () {
        const value = {
          type: "MultiLineString",
          coordinates: [],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with two-dimensional coordinates", function () {
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
      it("should work with three-dimensional coordinates", function () {
        const value = {
          type: "MultiLineString",
          coordinates: [
            [
              [1, 2, 3],
              [4, 5, 6],
            ],
          ],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
    });
    describe("invalid values", function () {
      const validValue = {
        type: "MultiLineString",
        coordinates: [
          [
            [1, 2],
            [3, 4],
          ],
        ],
      };

      it("should throw for missing type", function () {
        const { type: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for invalid type", function () {
        const value = {
          ...validValue,
          type: "BigMultiLineString",
        };
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for missing coordinates", function () {
        const { coordinates: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for single line string empty coordinates", function () {
        const value = {
          ...validValue,
          coordinates: [[]],
        };
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for single line string single coordinates", function () {
        const value = {
          ...validValue,
          coordinates: [[[1, 2]]],
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
