import type { TestContext } from "node:test";
import { expect, expectTypeOf } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export async function partitionTests(t: TestContext) {
  await t.test("AwsPartition", async (t) => {
    await t.test("should be assignable to strings", () => {
      expectTypeOf<zu.AwsPartition>().toExtend<string>();
    });

    await t.test("should not compile with string assignment", () => {
      expectTypeOf<string>().not.toExtend<zu.AwsPartition>();
    });
  });

  await t.test("partition", async (t) => {
    await t.test("should throw for undefined", () => {
      expect(() => zu.aws.partition().parse(undefined)).to.throw();
    });

    await t.test("should throw for empty string", () => {
      expect(() => zu.aws.partition().parse("")).to.throw();
    });

    await t.test("should throw for invalid partition", () => {
      expect(() => zu.aws.partition().parse("aws-iso")).to.throw();
    });

    await t.test("should work for aws", () => {
      const partition = zu.aws.partition().parse("aws");
      expectTypeOf(partition).toEqualTypeOf<zu.AwsPartition>();
      expect(partition).to.equal("aws");
    });

    await t.test("should work for aws-cn", () => {
      const partition = zu.aws.partition().parse("aws-cn");
      expectTypeOf(partition).toEqualTypeOf<zu.AwsPartition>();
      expect(partition).to.equal("aws-cn");
    });

    await t.test("should work for aws-us-gov", () => {
      const partition = zu.aws.partition().parse("aws-us-gov");
      expectTypeOf(partition).toEqualTypeOf<zu.AwsPartition>();
      expect(partition).to.equal("aws-us-gov");
    });
  });
}
