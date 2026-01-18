import { expect, expectTypeOf } from "@infra-blocks/test";
import { z } from "zod";
import { type Integer, zu } from "../../src/index.js";
import { injectAwsTests } from "./aws/index.js";
import { injectGeoJsonTests } from "./geojson/index.js";
import { injectIntegerTests } from "./integer.js";
import { injectIsoTests } from "./iso/index.js";
import { injectJsonTests } from "./json/index.js";
import { expectSchemaThrow as expectParseThrows } from "./lib.js";
import { injectStringTests } from "./string/index.js";

describe("zu", () => {
  injectAwsTests();
  injectIntegerTests();
  injectIsoTests();
  injectGeoJsonTests();
  injectJsonTests();
  injectStringTests();
  describe(zu.csv.name, () => {
    it("should throw with undefined", () => {
      expect(() => zu.csv().parse(undefined)).to.throw();
    });
    it("should resolve to an array with empty string with an empty string", () => {
      expect(zu.csv().parse("")).to.deep.equal([""]);
    });
    it("should split a comma-separated string", () => {
      expect(zu.csv().parse("a,b,c")).to.deep.equal(["a", "b", "c"]);
    });
    it("should work otherwise with a default value", () => {
      expect(zu.csv().default(["x", "y"]).parse(undefined)).to.deep.equal([
        "x",
        "y",
      ]);
    });
  });
  describe(zu.stringtoInteger.name, () => {
    const codec = zu.stringtoInteger();

    describe("parse", () => {
      const expectThrow = expectParseThrows(codec);

      function expectSuccess(value: number) {
        const result = codec.parse(value.toString(10));
        expectTypeOf(result).toEqualTypeOf<Integer>();
        expect(result).to.equal(value);
      }

      it("should throw for undefined", () => {
        expectThrow(undefined);
      });
      it("should throw for empty string", () => {
        expectThrow("");
      });
      it("should throw for float string", () => {
        expectThrow("3.14");
      });
      it("should work with negative integer", () => {
        expectSuccess(-42);
      });
      it("should work with 0", () => {
        expectSuccess(0);
      });
      it("should work with positive integer", () => {
        expectSuccess(42);
      });
    });
    describe("decode", () => {
      it("should work with strings as input", () => {
        const result = codec.decode("1234");
        expectTypeOf(result).toEqualTypeOf<Integer>();
        expect(result).to.equal(1234);
      });
    });
    describe("encode", () => {
      it("should work with Integer as input and produce string as output", () => {
        const decoded = codec.decode("1234");
        const result = codec.encode(decoded);
        expectTypeOf(result).toEqualTypeOf<string>();
        expect(result).to.equal("1234");
      });
    });
  });
  describe(zu.stringToUrl.name, () => {
    it("should throw for undefined", () => {
      expect(() => zu.stringToUrl().parse(undefined)).to.throw();
    });
    it("should throw for empty string", () => {
      expect(() => zu.stringToUrl().parse("")).to.throw();
    });
    it("should work for sftp URL", () => {
      const result = zu.stringToUrl().parse("sftp://user:pass@stfu.com");
      expect(result.protocol).to.equal("sftp:");
      expect(result.username).to.equal("user");
      expect(result.password).to.equal("pass");
      expect(result.hostname).to.equal("stfu.com");
    });
    it("should work with HTTP URL", () => {
      const result = zu.stringToUrl().parse("http://localhost:3000/zod-utils");
      expect(result.protocol).to.equal("http:");
      expect(result.hostname).to.equal("localhost");
      expect(result.port).to.equal("3000");
      expect(result.pathname).to.equal("/zod-utils");
    });
  });
  describe(zu.typeGuard.name, () => {
    type Test = z.infer<typeof schema>;

    const schema = z.string().min(5).brand("Test");
    const guard = zu.typeGuard(schema);

    it("should correctly narrow the type of the value upon success", () => {
      // Note that the type of myString here is `"hello world"`, and not `string`.
      // The guard then asserts that myString is `"hello world" & z.$brand<"Test">` instead
      // of `string & z.$brand<"Test">`, which is indeed compatible with `Test`, but not equal to it.
      const myString = "hello world";
      if (guard(myString)) {
        expectTypeOf(myString).toExtend<Test>();
      } else {
        expect.fail("Type guard failed unexpectedly");
      }
    });
  });
});
