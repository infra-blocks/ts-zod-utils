import { expect, expectTypeOf } from "@infra-blocks/test";
import { injectDirTests } from "@infra-blocks/test/mocha/bdd";
import { z } from "zod";
import type { AwsAccountId } from "../../src/aws/account-id.js";
import { zu } from "../../src/index.js";
import { injectCodecTests } from "./codec/index.js";
import { injectGeoJsonTests } from "./geojson/index.js";
import { injectIsoTests } from "./iso/index.js";
import { injectJsonTests } from "./json/index.js";
import { injectNumberTests } from "./number/index.js";
import { injectStringTests } from "./string/index.js";

describe("zu", async () => {
  // Submodules.
  injectCodecTests();
  injectGeoJsonTests();
  injectIsoTests();
  injectJsonTests();
  injectNumberTests();
  injectStringTests();
  await injectDirTests(import.meta.dirname);

  describe("inferBrand", () => {
    it("should resolve to never for an unbranded type", () => {
      type Brand = zu.inferBrand<string>;
      expectTypeOf<Brand>().toBeNever();
    });
    it("should work with a regular branded type", () => {
      type Brand = zu.inferBrand<AwsAccountId>;
      expectTypeOf<Brand>().toEqualTypeOf<"AwsAccountId">();
    });
    it("should unionize several brands", () => {
      type Brand = zu.inferBrand<AwsAccountId & z.$brand<5>>;
      expectTypeOf<Brand>().toEqualTypeOf<"AwsAccountId" | 5>();
    });
  });
  describe(zu.typeGuard.name, () => {
    type Test = z.infer<typeof schema>;

    const schema = z.string().min(5).brand("Test");
    const guard = zu.typeGuard(schema);

    it("should correctly narrow the type of the value upon success", () => {
      // Note that the type of myString here is `"hello world"`, and not `string`.
      // The guard then asserts that myString is `"hello world" & z.$brand<"Test">` instead
      // of `string & z.$brand<"Test">`, which is indeed compatible with `Test`, but not equal to it.
      const myString = "hello world";
      if (guard(myString)) {
        expectTypeOf(myString).toExtend<Test>();
      } else {
        expect.fail("Type guard failed unexpectedly");
      }
    });
  });
});
