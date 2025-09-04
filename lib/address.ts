export type AddressJson = {
  placeId?: string;
  formatted?: string;
  streetNumber?: string;
  route?: string;
  locality?: string;
  administrativeArea?: string;
  postalCode?: string;
  country?: string;
};

export function normalizeAddress(input: Partial<AddressJson> & { formatted?: string }) {
  // Keep minimal normalization for display and dedupe
  const formatted = (input.formatted || "").trim().replace(/\s+/g, " ");
  const postal = (input.postalCode || "").toUpperCase().replace(/\s+/g, "");
  return {
    ...input,
    formatted,
    postalCode: postal,
  } satisfies AddressJson;
}

export function fuzzyKey(a: AddressJson) {
  return [
    (a.streetNumber || "").toLowerCase(),
    (a.route || "").toLowerCase(),
    (a.locality || "").toLowerCase(),
    (a.administrativeArea || "").toLowerCase(),
    (a.postalCode || "").toLowerCase(),
  ].join("|");
}

// Re-export provider-based address functions so `@/lib/address` serves as a single entrypoint
export type { AddressSuggestion, ResolvedAddress } from "../src/lib/address";
export { suggest, resolve, currentProvider } from "../src/lib/address";
