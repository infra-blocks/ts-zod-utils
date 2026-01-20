import { expect, expectTypeOf } from "@infra-blocks/test";
import { z } from "zod";
import { zu } from "../../src/index.js";
import { injectAwsTests } from "./aws/index.js";
import { injectCodecTests } from "./codec/index.js";
import { injectGeoJsonTests } from "./geojson/index.js";
import { injectIsoTests } from "./iso/index.js";
import { injectJsonTests } from "./json/index.js";
import { injectNumberTests } from "./number/index.js";
import { injectStringTests } from "./string/index.js";

describe("zu", () => {
  // Submodules.
  injectAwsTests();
  injectCodecTests();
  injectGeoJsonTests();
  injectIsoTests();
  injectJsonTests();
  injectNumberTests();
  injectStringTests();

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
