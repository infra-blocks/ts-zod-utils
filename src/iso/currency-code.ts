import * as currencyCodes from "currency-codes";
import { z } from "zod";

const ISO_CODES = currencyCodes.codes();

const currencyCodeSchema = z.enum(ISO_CODES).brand("IsoCurrencyCode");

export type IsoCurrencyCode = z.infer<typeof currencyCodeSchema>;

/**
 * Returns a zod schema that validates that the input is a string that matches
 * an ISO 4217 currency code.
 *
 * The currency code is case-sensitive and all current currency codes are
 * all uppercase.
 *
 * @returns A zod schema that validates ISO currency code strings and return the {@link IsoCurrencyCode}
 * branded type as output.
 *
 * @see https://en.wikipedia.org/wiki/ISO_4217
 */
export const currencyCode = () => currencyCodeSchema;
