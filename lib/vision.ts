// Server-only vision stub; read process.env directly

export type PanelAnalysis = {
  serviceAmps?: number;
  freeSlots?: number;
  confidence: number;
  flags: string[];
};

export async function analyzePanel(images: string[]): Promise<PanelAnalysis> {
  if (!process.env.VISION_PROVIDER || !process.env.VISION_API_KEY) {
    return { confidence: 0, flags: ["vision_disabled"] };
  }
  // Provider-agnostic stub. Replace with real call.
  try {
    // Simulate a heuristic: if 3+ images present, return middling confidence
    const confidence = Math.min(0.9, images.length * 0.25);
    return { serviceAmps: 100, freeSlots: 2, confidence, flags: [] };
  } catch (e) {
    return { confidence: 0, flags: ["vision_error"] };
  }
}
