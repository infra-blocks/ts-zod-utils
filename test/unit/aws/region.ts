import type { TestContext } from "node:test";
import { expect, expectTypeOf } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export async function regionTests(t: TestContext) {
  await t.test("AwsRegion", async (t) => {
    await t.test("should be assignable to strings", () => {
      expectTypeOf<zu.AwsRegion>().toExtend<string>();
    });

    await t.test("should not compile with string assignment", () => {
      expectTypeOf<string>().not.toExtend<zu.AwsRegion>();
    });
  });

  await t.test("region", async (t) => {
    await t.test("should throw for undefined", () => {
      expect(() => zu.aws.region().parse(undefined)).to.throw();
    });

    await t.test("should throw for empty string", () => {
      expect(() => zu.aws.region().parse("")).to.throw();
    });

    await t.test("should throw for invalid region", () => {
      expect(() => zu.aws.region().parse("ca-north-1")).to.throw();
    });

    await t.test("should work for us-east-1", () => {
      const region = zu.aws.region().parse("us-east-1");
      expectTypeOf(region).toEqualTypeOf<zu.AwsRegion>();
      expect(region).to.equal("us-east-1");
    });
  });
}
