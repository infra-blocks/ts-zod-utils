import type { TestContext } from "node:test";
import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";
import { expectParseEquals, expectParseThrows } from "../lib.js";

export async function injectIsoDatetimeToDateTests(t: TestContext) {
  await t.test(zu.codec.isoDatetimeToDate.name, async (t) => {
    const codec = zu.codec.isoDatetimeToDate();

    await t.test("parse", async (t) => {
      const expectThrows = expectParseThrows(codec);
      const expectWorks = expectParseEquals(codec);

      await t.test("should throw for undefined", () => {
        expectThrows(undefined);
      });

      await t.test("should throw for empty string", () => {
        expectThrows("");
      });

      await t.test("should throw for invalid date string", () => {
        expectThrows("not-a-date");
      });

      await t.test("should throw for invalid ISO datetime", () => {
        // It's missing the Z qualifier.
        expectThrows("2020-01-01T06:15:00");
      });

      await t.test("should throw for date string", () => {
        // Produced by a call to Date.toDateString().
        expectThrows("Fri Oct 02 2026");
      });

      await t.test("should with with valid ISO datetime", () => {
        // Nakatomi plaza takeover by Hans Gruber.
        const isoDatetime = "1988-12-25T00:00:00Z";
        expectWorks(isoDatetime, new Date(isoDatetime));
      });
    });

    await t.test("encode", async (t) => {
      await t.test("should require date as input", () => {
        // @ts-expect-error Date required.
        expect(() => codec.encode("not-a-date")).to.throw();
      });

      await t.test("should dispatch to ISO string", () => {
        const now = new Date();
        expect(codec.encode(now)).to.equal(now.toISOString());
      });
    });
  });
}
