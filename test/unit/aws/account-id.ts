import type { TestContext } from "node:test";
import { expect, expectTypeOf } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export async function accountIdTests(t: TestContext) {
  await t.test("AwsAccountId", async (t) => {
    await t.test("should be assignable to strings", () => {
      expectTypeOf<zu.AwsAccountId>().toExtend<string>();
    });

    await t.test("should not compile with string assignment", () => {
      expectTypeOf<string>().not.toExtend<zu.AwsAccountId>();
    });
  });

  await t.test("accountId", async (t) => {
    await t.test("should throw for undefined", () => {
      expect(() => zu.aws.accountId().parse(undefined)).to.throw();
    });

    await t.test("should throw for empty string", () => {
      expect(() => zu.aws.accountId().parse("")).to.throw();
    });

    await t.test("should throw for non-integer string", () => {
      expect(() => zu.aws.accountId().parse("abcde12345f")).to.throw();
    });

    await t.test("should throw for string with less than 12 characters", () => {
      expect(() => zu.aws.accountId().parse("12345678901")).to.throw();
    });

    await t.test("should throw for string with more than 12 characters", () => {
      expect(() => zu.aws.accountId().parse("1234567890123")).to.throw();
    });

    await t.test("should work for valid 12-digit account ID", () => {
      const accountId = zu.aws.accountId().parse("123456789012");
      expectTypeOf(accountId).toEqualTypeOf<zu.AwsAccountId>();
      expect(accountId).to.equal("123456789012");
    });
  });
}
