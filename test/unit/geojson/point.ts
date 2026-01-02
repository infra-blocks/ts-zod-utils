import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export function pointTests() {
  describe(zu.geojson.point.name, () => {
    const schema = zu.geojson.point();
    describe("valid values", () => {
      it("should work with two-dimensional coordinates", () => {
        const value = {
          type: "Point",
          coordinates: [1, 2],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with three-dimensional coordinates", () => {
        const value = {
          type: "Point",
          coordinates: [1, 2, 3],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
    });
    describe("invalid values", () => {
      const validValue = {
        type: "Point",
        coordinates: [1, 2],
      };

      it("should throw for missing type", () => {
        const { type: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for invalid type", () => {
        const value = {
          ...validValue,
          type: "BigPoint",
        };
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for missing coordinates", () => {
        const { coordinates: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for invalid coordinates", () => {
        const value = {
          ...validValue,
          coordinates: [1],
        };
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for extra properties", () => {
        const value = {
          ...validValue,
          extra: "property",
        };
        expect(() => schema.parse(value)).to.throw();
      });
    });
  });
}
