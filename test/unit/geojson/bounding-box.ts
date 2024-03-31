import { expect } from "@infra-blocks/test";
import { GeoJsonBoundingBox } from "../../../src/geojson/index.js";
import { zu } from "../../../src/index.js";

export function boundingBoxTests() {
  describe(zu.geojson.boundingBox.name, function () {
    const schema = zu.geojson.boundingBox();
    describe("valid values", function () {
      it("should work with two-dimensional bounding box", function () {
        expect(schema.parse([1, 2, 3, 4])).to.deep.equal([
          1, 2, 3, 4,
        ] as GeoJsonBoundingBox);
      });
      it("should work with three-dimensional bounding box", function () {
        expect(schema.parse([1, 2, 3, 4, 5, 6])).to.deep.equal([
          1, 2, 3, 4, 5, 6,
        ] as GeoJsonBoundingBox);
      });
    });
    describe("invalid values", function () {
      it("should throw for tuple of 5", function () {
        expect(() => schema.parse([1, 2, 3, 4, 5])).to.throw();
      });
    });
  });
}
