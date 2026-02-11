import test from "node:test";
import { expect, expectTypeOf } from "@infra-blocks/test";
import { z } from "zod";
import type { AwsAccountId } from "../../src/aws/account-id.js";
import { zu } from "../../src/index.js";
import { injectAwsTests } from "./aws/index.js";
import { injectCodecTests } from "./codec/index.js";
import { injectGeoJsonTests } from "./geojson/index.js";
import { injectIsoTests } from "./iso/index.js";
import { injectJsonTests } from "./json/index.js";
import { injectNumberTests } from "./number/index.js";
import { injectStringTests } from "./string/index.js";

test("zu", async (t) => {
  // Submodules.
  await injectAwsTests(t);
  await injectCodecTests(t);
  await injectGeoJsonTests(t);
  await injectIsoTests(t);
  await injectJsonTests(t);
  await injectNumberTests(t);
  await injectStringTests(t);

  await t.test("inferBrand", async (t) => {
    await t.test("should resolve to never for an unbranded type", () => {
      type Brand = zu.inferBrand<string>;
      expectTypeOf<Brand>().toBeNever();
    });

    await t.test("should work with a regular branded type", () => {
      type Brand = zu.inferBrand<AwsAccountId>;
      expectTypeOf<Brand>().toEqualTypeOf<"AwsAccountId">();
    });

    await t.test("should unionize several brands", () => {
      type Brand = zu.inferBrand<AwsAccountId & z.$brand<5>>;
      expectTypeOf<Brand>().toEqualTypeOf<"AwsAccountId" | 5>();
    });
  });

  await t.test(zu.typeGuard.name, async (t) => {
    type Test = z.infer<typeof schema>;

    const schema = z.string().min(5).brand("Test");
    const guard = zu.typeGuard(schema);

    t.test("should correctly narrow the type of the value upon success", () => {
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
