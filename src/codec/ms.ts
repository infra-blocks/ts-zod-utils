import impl from "ms";
import { z } from "zod";

/**
 * A codec factory that returns codec parsing strings formatted
 * as expected by the [ms](https://www.npmjs.com/package/ms) and turning them
 * into their equivalent number in milliseconds.
 *
 * @param options - Those options are passed to `ms` when turning the milliseconds
 * number into a formatted string.
 *
 * @returns A codec where the schemas are {@link z.string} and {@link z.number},
 * and where the transforms between each are handled by the `ms` package.
 */
export const ms = (options?: { long: boolean }) =>
  z.codec(z.string(), z.number(), {
    decode: (str) => impl(str as impl.StringValue) ?? z.NEVER,
    encode: (millis) => impl(millis, options),
  });
