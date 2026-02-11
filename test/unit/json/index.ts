import type { TestContext } from "node:test";
import { injectArrayTests } from "./array.js";
import { injectObjectTests } from "./object.js";
import { injectPrimitiveTests } from "./primitive.js";
import { injectJsonValueTests } from "./value.js";

export async function injectJsonTests(t: TestContext) {
  await t.test("json", async (t) => {
    await injectArrayTests(t);
    await injectObjectTests(t);
    await injectPrimitiveTests(t);
    await injectJsonValueTests(t);
  });
}
