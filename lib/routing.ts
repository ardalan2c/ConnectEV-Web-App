import type { Lead, Org } from "@prisma/client";

export function scoreLead(lead: Lead) {
  let score = 0;
  if (lead.coords) score += 10;
  if (lead.runLengthMeters && lead.runLengthMeters < 15) score += 5;
  if (lead.priceBandMax) score += Math.min(20, Math.floor(lead.priceBandMax / 50000));
  return score;
}

export function suggestPartners(partners: Org[], city?: string) {
  return partners
    .filter((p) => p.status === "active")
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 3);
}

