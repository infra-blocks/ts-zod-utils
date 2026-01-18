import { expect } from "@infra-blocks/test";
import type { z } from "zod";

export function expectSchemaThrow<S extends z.ZodType>(schema: S) {
  return (value: unknown) => {
    expect(() => schema.parse(value)).to.throw();
  };
}
