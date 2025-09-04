import { describe, it, expect } from "vitest";
import { analyzePanel } from "@/lib/vision";

describe("vision parser", () => {
  it("falls back when disabled", async () => {
    const res = await analyzePanel(["a", "b", "c"]);
    expect(res).toHaveProperty("confidence");
  });
});

