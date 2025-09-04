import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_ANON_KEY: z.string().min(1).optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(), // server-only
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
  DATABASE_URL: z.string().min(1).optional(),
  CALENDLY_URL: z.string().url().optional(),
  ADDRESS_PROVIDER: z.enum(["none","google","mapbox"]).optional(),
  WIZARD_SIMPLE: z.enum(["true","false"]).optional(),
  NEXT_PUBLIC_SUPPORT_PHONE_E164: z.string().regex(/^\+[1-9]\d{1,14}$/).optional(),

  // Optional analytics/feature flags (keep optional)
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().optional(),
  NEXT_PUBLIC_FEATURE_USE_CALENDLY: z.string().optional(),
  NEXT_PUBLIC_CALENDLY_URL: z.string().optional(),

  // Misc optionals preserved from previous code
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string().optional(),
  GOOGLE_MAPS_API_KEY_SERVER: z.string().optional(),
  NEXT_PUBLIC_MAPBOX_TOKEN: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  TWILIO_ACCOUNT_SID: z.string().optional(),
  TWILIO_AUTH_TOKEN: z.string().optional(),
  TWILIO_MESSAGING_SERVICE_SID: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  VISION_PROVIDER: z.string().optional(),
  VISION_API_KEY: z.string().optional(),
  ACDC_ORG_ID: z.string().optional(),
  ADMIN_ACCESS_TOKEN: z.string().optional(),
  SLACK_WEBHOOK_URL: z.string().optional(),
  STRIPE_PAYMENT_LINK_URL: z.string().optional(),
  SUPABASE_BUCKET: z.string().optional(),
});

export function assertProdEnv() {
  if (process.env.NODE_ENV !== "production") return;
  const required = [
    "NEXT_PUBLIC_SITE_URL",
    "SUPABASE_URL",
    "SUPABASE_ANON_KEY",
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "DATABASE_URL",
    "CALENDLY_URL",
    "ADDRESS_PROVIDER",
    "WIZARD_SIMPLE",
    "NEXT_PUBLIC_SUPPORT_PHONE_E164",
  ];
  const missing = required.filter((k) => !process.env[k] || process.env[k] === "");
  if (missing.length) {
    throw new Error(`Missing required production env vars: ${missing.join(", ")}`);
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY in production");
  }
}

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  if (process.env.NODE_ENV === "production") {
    throw new Error(parsed.error.message);
  } else {
    console.warn("[env] Non-fatal env issues:", parsed.error.format());
  }
}

const E = (parsed.success ? parsed.data : (process.env as any)) as Record<string, string>;

export const env = {
  databaseUrl: E.DATABASE_URL || "",
  addressProvider: E.ADDRESS_PROVIDER || "none",
  calendlyUrl: E.CALENDLY_URL || "",
  supportPhoneE164: E.NEXT_PUBLIC_SUPPORT_PHONE_E164 || "",
  posthogKey: E.NEXT_PUBLIC_POSTHOG_KEY || "",
  posthogHost: E.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
  supabaseUrl: E.SUPABASE_URL || "",
  supabaseServiceKey: E.SUPABASE_SERVICE_ROLE_KEY || "",
  supabaseBucket: E.SUPABASE_BUCKET || "leads",
};

