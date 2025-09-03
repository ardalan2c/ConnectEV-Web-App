export type Extras = {
  pedestal?: boolean;
  trenchingMeters?: number; // per meter
  drywallRepair?: boolean;
  loadMgmtDevice?: boolean;
};

export function estimatePriceBand(runLengthMeters: number, extras: Extras = {}) {
  // Baseline band (CAD) tuned for GTA typicals
  let min = 110000; // $1,100
  let max = 220000; // $2,200

  // Run length adders beyond 10m
  const extraRun = Math.max(0, runLengthMeters - 10);
  min += extraRun * 3000; // $30/m
  max += extraRun * 5000; // $50/m

  if (extras.pedestal) {
    min += 15000; // $150
    max += 30000; // $300
  }
  if (extras.trenchingMeters && extras.trenchingMeters > 0) {
    min += extras.trenchingMeters * 10000; // $100/m
    max += extras.trenchingMeters * 15000; // $150/m
  }
  if (extras.drywallRepair) {
    min += 15000;
    max += 25000;
  }
  if (extras.loadMgmtDevice) {
    min += 25000;
    max += 40000;
  }

  return { min, max };
}

export function clampBand(band: { min: number; max: number }) {
  const min = Math.max(75000, Math.min(band.min, band.max));
  const max = Math.max(min + 20000, band.max);
  return { min, max };
}

