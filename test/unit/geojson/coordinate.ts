import { expect } from "@infra-blocks/test";
import { GeoJsonCoordinate } from "../../../src/geojson/index.js";
import { zu } from "../../../src/index.js";

export function positionTests() {
  describe(zu.geojson.coordinate.name, function () {
    const schema = zu.geojson.coordinate();
    describe("valid values", function () {
      it("should work with two-dimensional position", function () {
        expect(schema.parse([1, 2])).to.deep.equal([1, 2] as GeoJsonCoordinate);
      });
      it("should work with three-dimensional position", function () {
        expect(schema.parse([1, 2, 3])).to.deep.equal([
          1, 2, 3,
        ] as GeoJsonCoordinate);
      });
    });
    describe("invalid values", function () {
      it("should throw for tuple of 1", function () {
        expect(() => schema.parse([0])).to.throw();
      });
      it("should throw for empty array", function () {
        expect(() => schema.parse([])).to.throw();
      });
      it("should throw for null", function () {
        expect(() => schema.parse(null)).to.throw();
      });
      it("should throw for undefined", function () {
        expect(() => schema.parse(undefined)).to.throw();
      });
    });
  });
}
