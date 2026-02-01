import { z } from "zod";

export const stringToBuffer = (encoding?: BufferEncoding) => {
  return z.codec(z.string(), z.instanceof(Buffer), {
    decode: (str) => Buffer.from(str, encoding),
    encode: (buf) => buf.toString(encoding),
  });
};
