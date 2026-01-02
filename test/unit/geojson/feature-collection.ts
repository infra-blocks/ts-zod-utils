import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export function featureCollectionTests() {
  describe(zu.geojson.featureCollection.name, () => {
    const schema = zu.geojson.featureCollection();
    describe("valid values", () => {
      it("should work with empty features", () => {
        const value = {
          type: "FeatureCollection",
          features: [],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with a single feature", () => {
        const value = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: null,
              properties: null,
            },
          ],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
    });
    describe("invalid values", () => {
      const validValue = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [1, 2],
            },
            properties: null,
          },
        ],
      };

      it("should throw for missing type", () => {
        const { type: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for invalid type", () => {
        const value = {
          ...validValue,
          type: "BigFeatureCollection",
        };
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for missing features", () => {
        const { features: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for invalid features", () => {
        const value = {
          ...validValue,
          features: [{ type: "BigFeature" }],
        };
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for extra properties", () => {
        const value = {
          ...validValue,
          extra: "boom",
        };
        expect(() => schema.parse(value)).to.throw();
      });
    });
  });
}
