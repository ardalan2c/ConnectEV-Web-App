// Launch feature flags for simple mode
export const LAUNCH_CONFIG = {
  WIZARD_SIMPLE: process.env.WIZARD_SIMPLE === 'true',
  AI_PANEL_ANALYZER: process.env.AI_PANEL_ANALYZER === 'true',  
  DEPOSITS_ENABLED: process.env.NEXT_PUBLIC_DEPOSITS_ENABLED === 'true',
  PARTNER_PORTAL: process.env.PARTNER_PORTAL === 'true',
  SCHEDULING_MODE: process.env.SCHEDULING_MODE || 'calendly',
} as const;