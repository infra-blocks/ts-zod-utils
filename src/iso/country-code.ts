import { iso31661 } from "iso-3166";
import { z } from "zod";

const ALPHA_3_CODES = iso31661.map((entry) => entry.alpha3);

const alpha3CodeSchema = z.enum(ALPHA_3_CODES).brand("IsoAlpha3CountryCode");

export type IsoAlpha3CountryCode = z.infer<typeof alpha3CodeSchema>;

/**
 * Returns a zod schema that validates that the input is a string that matches
 * an ISO 3166 alpha 3 country code.
 *
 * The currency code is case-sensitive and all current currency codes are
 * all uppercase.
 *
 * @returns A zod schema that validates ISO alpha 3 code strings and return the {@link IsoAlpha3CountryCode}
 * branded type as output.
 *
 * @see https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
 */
export const countryCode = {
  alpha3: () => alpha3CodeSchema,
};
