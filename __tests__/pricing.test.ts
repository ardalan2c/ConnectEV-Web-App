import { describe, it, expect } from "vitest";
import { estimatePriceBand, clampBand } from "@/lib/pricing";

describe("pricing", () => {
  it("estimates baseline band", () => {
    const b = clampBand(estimatePriceBand(10, {}));
    expect(b.min).toBeGreaterThan(100000);
    expect(b.max).toBeGreaterThan(b.min);
  });
  it("adds run length", () => {
    const a = estimatePriceBand(10, {});
    const b = estimatePriceBand(20, {});
    expect(b.min).toBeGreaterThan(a.min);
    expect(b.max).toBeGreaterThan(a.max);
  });
});

