import type { TestContext } from "node:test";
import { injectIntegerTests } from "./integer.js";
import { injectPositiveIntegerTests } from "./positive-integer.js";

export async function injectNumberTests(t: TestContext) {
  await t.test("number", async (t) => {
    await injectIntegerTests(t);
    await injectPositiveIntegerTests(t);
  });
}
