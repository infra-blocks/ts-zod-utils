import { expectTypeOf } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";
import { expectParseEquals, expectParseThrows } from "../lib.js";

export function injectJsonTests() {
  describe("json", () => {
    const schema = zu.string.json();
    const expectThrows = expectParseThrows(schema);
    const expectEquals = expectParseEquals(schema);
    const expectWorks = (value: string) => {
      expectTypeOf(expectEquals(value)).toEqualTypeOf<zu.JsonString>();
    };

    it("should throw for undefined", () => {
      expectThrows(undefined);
    });
    it("should throw for empty string", () => {
      expectThrows("");
    });
    it("should throw for invalid json string", () => {
      expectThrows("{ unclosed fucking bracket");
    });
    it("should work with '5'", () => {
      expectWorks("5");
    });
    it("should work with 'word'", () => {
      expectWorks('"word"');
    });
    it("should work with '[1, true, null]'", () => {
      expectWorks("[1, true, null]");
    });
    it("should work with an object", () => {
      const object = {
        number: 5,
        string: "toto",
        null: null,
        boolean: false,
        array: [1, "tata", null, true],
        nested: { whoCares: "me" },
      };
      expectWorks(JSON.stringify(object));
    });
  });
}
