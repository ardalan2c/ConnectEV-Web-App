import { describe, it, expect } from "vitest";
import { normalizeAddress, fuzzyKey } from "@/lib/address";

describe("address", () => {
  it("normalizes postal code", () => {
    const n = normalizeAddress({ formatted: "x", postalCode: "m5 v 2n1" });
    expect(n.postalCode).toBe("M5V2N1");
  });
  it("makes fuzzy key", () => {
    const k = fuzzyKey({ streetNumber: "10", route: "King St W", locality: "Toronto", administrativeArea: "ON", postalCode: "M5V2N1" });
    expect(k).toContain("10");
  });
});

