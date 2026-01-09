import { expect } from "@infra-blocks/test";
import type { GeoJsonCoordinate } from "../../../src/geojson/types.js";
import { zu } from "../../../src/index.js";

export function positionTests() {
  describe(zu.geojson.coordinate.name, () => {
    const schema = zu.geojson.coordinate();
    describe("valid values", () => {
      it("should work with two-dimensional position", () => {
        expect(schema.parse([1, 2])).to.deep.equal([1, 2] as GeoJsonCoordinate);
      });
      it("should work with three-dimensional position", () => {
        expect(schema.parse([1, 2, 3])).to.deep.equal([
          1, 2, 3,
        ] as GeoJsonCoordinate);
      });
    });
    describe("invalid values", () => {
      it("should throw for tuple of 1", () => {
        expect(() => schema.parse([0])).to.throw();
      });
      it("should throw for empty array", () => {
        expect(() => schema.parse([])).to.throw();
      });
      it("should throw for null", () => {
        expect(() => schema.parse(null)).to.throw();
      });
      it("should throw for undefined", () => {
        expect(() => schema.parse(undefined)).to.throw();
      });
    });
  });
}
