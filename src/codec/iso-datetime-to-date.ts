import { z } from "zod";

const codec = z.codec(z.iso.datetime(), z.date(), {
  decode: (isoString) => new Date(isoString),
  encode: (date) => date.toISOString(),
});

/**
 * An ISO datetime string to date object codec.
 *
 * This is taken from [Zod's own documentation](https://zod.dev/codecs?id=isodatetimetodate#isodatetimetodate),
 */
export const isoDatetimeToDate = () => codec;
