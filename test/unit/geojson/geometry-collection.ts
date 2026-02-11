import type { TestContext } from "node:test";
import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export async function geometryCollectionTests(t: TestContext) {
  await t.test(zu.geojson.geometryCollection.name, async (t) => {
    const schema = zu.geojson.geometryCollection();

    await t.test("valid values", async (t) => {
      await t.test("should work with empty geometries", () => {
        const value = {
          type: "GeometryCollection",
          geometries: [],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });

      await t.test("should work with a line string", () => {
        const value = {
          type: "GeometryCollection",
          geometries: [
            {
              type: "LineString",
              coordinates: [
                [1, 2],
                [2, 3],
              ],
            },
          ],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });

      await t.test("should work with a multi-line string", () => {
        const value = {
          type: "GeometryCollection",
          geometries: [
            {
              type: "MultiLineString",
              coordinates: [
                [
                  [1, 2],
                  [2, 3],
                ],
              ],
            },
          ],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });

      await t.test("should work with a multi-point", () => {
        const value = {
          type: "GeometryCollection",
          geometries: [
            {
              type: "MultiPoint",
              coordinates: [[1, 2]],
            },
          ],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });

      await t.test("should work with a multi-polygon", () => {
        const value = {
          type: "GeometryCollection",
          geometries: [
            {
              type: "MultiPolygon",
              coordinates: [[[[1, 2]]]],
            },
          ],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });

      await t.test("should work with a point", () => {
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

      await t.test("should work with a polygon", () => {
        const value = {
          type: "GeometryCollection",
          geometries: [
            {
              type: "Polygon",
              coordinates: [[[1, 2]]],
            },
          ],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });

      await t.test("should work with a geometry collection", () => {
        const value = {
          type: "GeometryCollection",
          geometries: [
            {
              type: "GeometryCollection",
              geometries: [
                {
                  type: "Point",
                  coordinates: [1, 2],
                },
              ],
            },
          ],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
    });

    await t.test("invalid values", async (t) => {
      const validValue = {
        type: "GeometryCollection",
        geometries: [
          {
            type: "Point",
            coordinates: [1, 2],
          },
        ],
      };

      await t.test("should throw for missing type", () => {
        const { type: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });

      await t.test("should throw for invalid type", () => {
        const value = {
          ...validValue,
          type: "BigGeometryCollection",
        };
        expect(() => schema.parse(value)).to.throw();
      });

      await t.test("should throw for missing geometries", () => {
        const { geometries: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });

      await t.test("should throw for invalid geometry", () => {
        const value = {
          ...validValue,
          geometries: [
            {
              type: "BigGeometry",
              coordinates: [1, 2],
            },
          ],
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
  });
}
