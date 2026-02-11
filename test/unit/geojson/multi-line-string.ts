import type { TestContext } from "node:test";
import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export async function multiLineStringTests(t: TestContext) {
  await t.test(zu.geojson.multiLineString.name, async (t) => {
    const schema = zu.geojson.multiLineString();

    await t.test("valid values", async (t) => {
      await t.test("should work with empty coordinates", () => {
        const value = {
          type: "MultiLineString",
          coordinates: [],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });

      await t.test("should work with two-dimensional coordinates", () => {
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

      await t.test("should work with three-dimensional coordinates", () => {
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

    await t.test("invalid values", async (t) => {
      const validValue = {
        type: "MultiLineString",
        coordinates: [
          [
            [1, 2],
            [3, 4],
          ],
        ],
      };

      await t.test("should throw for missing type", () => {
        const { type: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });

      await t.test("should throw for invalid type", () => {
        const value = {
          ...validValue,
          type: "BigMultiLineString",
        };
        expect(() => schema.parse(value)).to.throw();
      });

      await t.test("should throw for missing coordinates", () => {
        const { coordinates: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });

      await t.test(
        "should throw for single line string empty coordinates",
        () => {
          const value = {
            ...validValue,
            coordinates: [[]],
          };
          expect(() => schema.parse(value)).to.throw();
        },
      );

      await t.test(
        "should throw for single line string single coordinates",
        () => {
          const value = {
            ...validValue,
            coordinates: [[[1, 2]]],
          };
          expect(() => schema.parse(value)).to.throw();
        },
      );

      await t.test("should throw for extra properties", () => {
        const value = {
          ...validValue,
          extra: "property",
        };
        expect(() => schema.parse(value)).to.throw();
      });
    });
  });
}
