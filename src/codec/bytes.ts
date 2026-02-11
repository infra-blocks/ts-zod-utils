import impl, { type BytesOptions } from "bytes";
import { z } from "zod";

/**
 * A codec factory that returns a codec parsing strings formatted
 * as expected by the [bytes](https://www.npmjs.com/package/bytes) and turning them
 * into their equivalent number in bytes.
 *
 * @param options - Those options are passed to `ms` when turning the milliseconds
 * number into a formatted string.
 *
 * @returns A codec where the schemas are {@link z.string} and {@link z.number},
 * and where the transforms between each are handled by the `ms` package.
 */
export const bytes = (options?: BytesOptions) =>
  z.codec(z.string(), z.number(), {
    decode: (str) => impl.parse(str) ?? z.NEVER,
    encode: (bytes) => impl.format(bytes, options) ?? z.NEVER,
  });
