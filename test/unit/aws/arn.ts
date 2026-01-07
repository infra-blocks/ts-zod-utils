import { expect, expectTypeOf } from "@infra-blocks/test";
import type { AwsArn } from "../../../src/aws/types.js";
import { zu } from "../../../src/index.js";

export function arnTests() {
  describe("AwsArn", () => {
    it("should be assignable to strings", () => {
      expectTypeOf<AwsArn>().toExtend<string>();
    });
    it("should not compile with string assignment", () => {
      expectTypeOf<string>().not.toExtend<AwsArn>();
    });
  });
  describe("arn", () => {
    it("should throw for undefined", () => {
      expect(() => zu.aws.arn().parse(undefined)).to.throw();
    });
    it("should throw for empty string", () => {
      expect(() => zu.aws.arn().parse("")).to.throw();
    });
    it("should throw for too few parts", () => {
      expect(() => zu.aws.arn().parse("arn:aws:s3::toto")).to.throw();
    });
    it("should throw for too many parts", () => {
      expect(() => zu.aws.arn().parse("arn:aws:s3:::::toto")).to.throw();
    });
    it("should throw if not starting with arn", () => {
      expect(() => zu.aws.arn().parse("arnx:aws:s3:::my-bucket")).to.throw();
    });
    it("should throw for invalid partition", () => {
      expect(() =>
        zu.aws.arn().parse("arn:aws-chiner:s3:::my-bucket"),
      ).to.throw();
    });
    it("should throw for empty service", () => {
      expect(() =>
        zu.aws.arn().parse("arn:aws-chiner::us-east-1:123456789012:my-bucket"),
      ).to.throw();
    });
    it("should throw for invalid region", () => {
      expect(() =>
        zu.aws.arn().parse("arn:aws:s3:us-flex-1:123456789012:my-bucket"),
      ).to.throw();
    });
    it("should throw for invalid account ID", () => {
      expect(() =>
        zu.aws.arn().parse("arn:aws:s3:us-flex-1:1234567890:my-bucket"),
      ).to.throw();
    });
    it("should parse valid ARN without region", () => {
      const value = "arn:aws:s3::123456789012:my-bucket";
      const arn = zu.aws.arn().parse(value);
      expectTypeOf(arn).toEqualTypeOf<AwsArn>();
      expect(arn).to.equal(value);
    });
    it("should parse valid ARN without account ID", () => {
      const value = "arn:aws:s3:us-east-1::my-bucket";
      const arn = zu.aws.arn().parse(value);
      expectTypeOf(arn).toEqualTypeOf<AwsArn>();
      expect(arn).to.equal(value);
    });
    it("should parse valid ARN with resource type delimited by colon", () => {
      const value =
        "arn:aws:lambda:us-east-1:123456789012:function:my-function:1";
      const arn = zu.aws.arn().parse(value);
      expectTypeOf(arn).toEqualTypeOf<AwsArn>();
      expect(arn).to.equal(value);
    });
    it("should parse valid ARN with resource type delimited by slash", () => {
      const value = "arn:aws:iam:us-east-1:123456789012:user/joe-cunt";
      const arn = zu.aws.arn().parse(value);
      expectTypeOf(arn).toEqualTypeOf<AwsArn>();
      expect(arn).to.equal(value);
    });
  });
}
