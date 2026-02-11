import type { TestContext } from "node:test";
import { injectBase64UrlTests } from "./base64url.js";
import { injectIntegerTests } from "./integer.js";
import { injectJsonTests } from "./json.js";
import { injectNumberTests } from "./number.js";
import { injectPositiveIntegerTests } from "./positive-integer.js";
import { injectUrlTests } from "./url.js";

export async function injectStringTests(t: TestContext) {
  await t.test("string", async (t) => {
    await injectBase64UrlTests(t);
    await injectIntegerTests(t);
    await injectJsonTests(t);
    await injectNumberTests(t);
    await injectPositiveIntegerTests(t);
    await injectUrlTests(t);
  });
}
