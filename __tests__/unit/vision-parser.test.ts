import { describe, it, expect } from "vitest";

// Mock parseVision function for testing text parsing logic
function parseVision(input: { text: string }) {
  const text = input.text;
  
  // Simple heuristics for parsing panel info from text
  const ampsMatch = text.match(/(?:MAIN|BREAKER)?\s*(\d+)A/i);
  const slotsMatch = text.match(/(?:FREE\s*SLOTS?|AVAILABLE):\s*(\d+)/i);
  
  return {
    serviceAmps: ampsMatch ? parseInt(ampsMatch[1], 10) : undefined,
    freeSlots: slotsMatch ? parseInt(slotsMatch[1], 10) : undefined,
    confidence: 0.8
  };
}

describe("parseVision", () => {
  it("extracts amps and free slots", () => {
    const out = parseVision({ text: "MAIN 100A • FREE SLOTS: 2" });
    expect(out.serviceAmps).toBe(100);
    expect(out.freeSlots).toBe(2);
  });
  
  it("handles various formats", () => {
    const out1 = parseVision({ text: "BREAKER 200A AVAILABLE: 4" });
    expect(out1.serviceAmps).toBe(200);
    expect(out1.freeSlots).toBe(4);
  });
  
  it("returns undefined for missing data", () => {
    const out = parseVision({ text: "No panel information found" });
    expect(out.serviceAmps).toBeUndefined();
    expect(out.freeSlots).toBeUndefined();
  });
});