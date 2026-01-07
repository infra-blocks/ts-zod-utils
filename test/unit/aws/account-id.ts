import { expect, expectTypeOf } from "@infra-blocks/test";
import type { AwsAccountId } from "../../../src/aws/types.js";
import { zu } from "../../../src/index.js";

export function accountIdTests() {
  describe("AwsAccountId", () => {
    it("should be assignable to strings", () => {
      expectTypeOf<AwsAccountId>().toExtend<string>();
    });
    it("should not compile with string assignment", () => {
      expectTypeOf<string>().not.toExtend<AwsAccountId>();
    });
  });
  describe("accountId", () => {
    it("should throw for undefined", () => {
      expect(() => zu.aws.accountId().parse(undefined)).to.throw();
    });
    it("should throw for empty string", () => {
      expect(() => zu.aws.accountId().parse("")).to.throw();
    });
    it("should throw for non-integer string", () => {
      expect(() => zu.aws.accountId().parse("abcde12345f")).to.throw();
    });
    it("should throw for string with less than 12 characters", () => {
      expect(() => zu.aws.accountId().parse("12345678901")).to.throw();
    });
    it("should throw for string with more than 12 characters", () => {
      expect(() => zu.aws.accountId().parse("1234567890123")).to.throw();
    });
    it("should work for valid 12-digit account ID", () => {
      const accountId = zu.aws.accountId().parse("123456789012");
      expectTypeOf(accountId).toEqualTypeOf<AwsAccountId>();
      expect(accountId).to.equal("123456789012");
    });
  });
}
