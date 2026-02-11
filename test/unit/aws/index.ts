import type { TestContext } from "node:test";
import { accountIdTests } from "./account-id.js";
import { arnTests } from "./arn.js";
import { partitionTests } from "./partition.js";
import { regionTests } from "./region.js";

export async function injectAwsTests(t: TestContext) {
  await t.test("aws", async (t) => {
    await accountIdTests(t);
    await arnTests(t);
    await partitionTests(t);
    await regionTests(t);
  });
}
