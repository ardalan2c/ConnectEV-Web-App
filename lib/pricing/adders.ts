export type PricingInput = {
  runLengthMeters: number; // cable run
  exteriorPenetration?: boolean;
  finishedWalls?: boolean; // drywall repair
  pedestal?: boolean;
  trenchMeters?: number;
  loadMgmt?: 'none' | 'smartSplitter' | 'dcc';
  subPanel?: boolean;
  panelUpgradeFlag?: boolean; // suspected upgrade
};

export type PriceBand = { min: number; max: number; disclaimers: string[] };

// GTA-friendly starter matrix — tune per your costs
const BASE = 950; // base L2 up to included run
const RUN_INCLUDED_METERS = 6; // included in base
const PER_3M = 120; // each additional 3m
const EXTERIOR_PEN = 90;
const FINISHED_WALL = 180;
const PEDESTAL = 380;
const TRENCH_PER_M = 55; // soil, simple
const LOAD_SMART_SPLITTER = 360;
const LOAD_DCC = 680;
const SUB_PANEL = 650;
const PANEL_UPGRADE_FLAG = 1200; // indicative only

export function computePriceBand(i: PricingInput): PriceBand {
  let total = BASE;
  const disc: string[] = [];

  const extraMeters = Math.max(0, i.runLengthMeters - RUN_INCLUDED_METERS);
  total += Math.ceil(extraMeters / 3) * PER_3M;

  if (i.exteriorPenetration) total += EXTERIOR_PEN;
  if (i.finishedWalls) total += FINISHED_WALL;
  if (i.pedestal) total += PEDESTAL;
  if (i.trenchMeters && i.trenchMeters > 0) total += i.trenchMeters * TRENCH_PER_M;

  if (i.loadMgmt === 'smartSplitter') total += LOAD_SMART_SPLITTER;
  if (i.loadMgmt === 'dcc') total += LOAD_DCC;

  if (i.subPanel) total += SUB_PANEL;
  if (i.panelUpgradeFlag) {
    total += PANEL_UPGRADE_FLAG;
    disc.push('Panel/service upgrade to be confirmed on site with ESA.');
  }

  // Provide ±12% band to account for unknowns; min not below base
  const min = Math.max(BASE, Math.round(total * 0.88));
  const max = Math.round(total * 1.12);
  return { min, max, disclaimers: disc };
}