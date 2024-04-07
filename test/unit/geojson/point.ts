import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";
import _ = require("lodash/fp");

export function pointTests() {
  describe(zu.geojson.point.name, function () {
    const schema = zu.geojson.point();
    describe("valid values", function () {
      it("should work with two-dimensional coordinates", function () {
        const value = {
          type: "Point",
          coordinates: [1, 2],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with three-dimensional coordinates", function () {
        const value = {
          type: "Point",
          coordinates: [1, 2, 3],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
    });
    describe("invalid values", function () {
      const validValue = {
        type: "Point",
        coordinates: [1, 2],
      };

      it("should throw for missing type", function () {
        const value = _.omit("type", validValue);
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for invalid type", function () {
        const value = {
          ...validValue,
          type: "BigPoint",
        };
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for missing coordinates", function () {
        const value = _.omit("coordinates", validValue);
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for invalid coordinates", function () {
        const value = {
          ...validValue,
          coordinates: [1],
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
