import type { TestContext } from "node:test";
import { injectBytesTests } from "./bytes.js";
import { injectCsvTests } from "./csv.js";
import { injectMsTests } from "./ms.js";
import { injectStringToBufferTests } from "./string-to-buffer.js";
import { injectStringToIntegerTests } from "./string-to-integer.js";
import { injectStringToJsonTests } from "./string-to-json.js";
import { injectStringToPositiveIntegerTests } from "./string-to-positive-integer.js";
import { injectStringToUrlTests } from "./string-to-url.js";

export async function injectCodecTests(t: TestContext) {
  await t.test("codec", async (t) => {
    await injectBytesTests(t);
    await injectCsvTests(t);
    await injectMsTests(t);
    await injectStringToBufferTests(t);
    await injectStringToIntegerTests(t);
    await injectStringToJsonTests(t);
    await injectStringToPositiveIntegerTests(t);
    await injectStringToUrlTests(t);
  });
}
