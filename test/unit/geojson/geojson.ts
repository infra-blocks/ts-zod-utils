import type { TestContext } from "node:test";
import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export async function geojsonTests(t: TestContext) {
  const schema = zu.geojson();
  await t.test("valid values", async (t) => {
    // We test all geometries once.
    await t.test("should work with a geometry collection", () => {
      const value = {
        type: "GeometryCollection",
        geometries: [
          {
            type: "Point",
            coordinates: [1, 2],
          },
        ],
      };
      expect(schema.parse(value)).to.deep.equal(value);
    });

    await t.test("should work with a line string", () => {
      const value = {
        type: "LineString",
        coordinates: [
          [1, 2],
          [3, 4],
        ],
      };
      expect(schema.parse(value)).to.deep.equal(value);
    });

    await t.test("should work with a multi-line string", () => {
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

    await t.test("should work with a multi-point", () => {
      const value = {
        type: "MultiPoint",
        coordinates: [[1, 2]],
      };
      expect(schema.parse(value)).to.deep.equal(value);
    });

    await t.test("should work with a multi-polygon", () => {
      const value = {
        type: "MultiPolygon",
        coordinates: [[[[1, 2]]]],
      };
      expect(schema.parse(value)).to.deep.equal(value);
    });

    await t.test("should work with a point", () => {
      const value = {
        type: "Point",
        coordinates: [1, 2],
      };
      expect(schema.parse(value)).to.deep.equal(value);
    });

    await t.test("should work with a polygon", () => {
      const value = {
        type: "Polygon",
        coordinates: [[[1, 2]]],
      };
      expect(schema.parse(value)).to.deep.equal(value);
    });

    // One feature.
    await t.test("should work with a feature", () => {
      const value = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [1, 2],
        },
        properties: null,
      };
      expect(schema.parse(value)).to.deep.equal(value);
    });

    // One feature collection.
    await t.test("should work with a feature collection", () => {
      const value = {
        type: "FeatureCollection",
        features: [],
      };
      expect(schema.parse(value)).to.deep.equal(value);
    });
  });

  // Because the only discriminant is the type, we only test the type property. Each respective schema of the union is
  // tested into its own module.
  await t.test("invalid values", async (t) => {
    const validValue = {
      type: "Point",
      coordinates: [1, 2],
    };

    await t.test("should throw for missing type", () => {
      const { type: _, ...value } = validValue;
      expect(() => schema.parse(value)).to.throw();
    });

    await t.test("should throw for invalid type", () => {
      const value = {
        ...validValue,
        type: "BigGeoJson",
      };
      expect(() => schema.parse(value)).to.throw();
    });

    await t.test("should throw for extra properties", () => {
      const value = {
        ...validValue,
        extra: "boom",
      };
      expect(() => schema.parse(value)).to.throw();
    });
  });
}
