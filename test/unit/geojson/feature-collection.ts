import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";
import _ = require("lodash/fp");

export function featureCollectionTests() {
  describe(zu.geojson.featureCollection.name, function () {
    const schema = zu.geojson.featureCollection();
    describe("valid values", function () {
      it("should work with empty features", function () {
        const value = {
          type: "FeatureCollection",
          features: [],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with a single feature", function () {
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
    describe("invalid values", function () {
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

      it("should throw for missing type", function () {
        const value = _.omit("type", validValue);
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for invalid type", function () {
        const value = {
          ...validValue,
          type: "BigFeatureCollection",
        };
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for missing features", function () {
        const value = _.omit("features", validValue);
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for invalid features", function () {
        const value = {
          ...validValue,
          features: [{ type: "BigFeature" }],
        };
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for extra properties", function () {
        const value = {
          ...validValue,
          extra: "boom",
        };
        expect(() => schema.parse(value)).to.throw();
      });
    });
  });
}
