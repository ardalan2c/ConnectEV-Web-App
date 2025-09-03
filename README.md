# ConnectEV Inc. — "Charge ahead."

Production-ready, SEO-first lead-gen web app for EV-charger installs across the GTA. Built with Next.js 15, Tailwind, Prisma + Postgres, and pragmatic stubs for external providers.

## Getting Started

1) Install deps

```bash
pnpm i
```

2) Create a Supabase (or Postgres) project; copy its connection string to `DATABASE_URL`.

```bash
pnpm db:migrate && pnpm db:seed
# (for local prototyping you may also use: pnpm db:push)
```

3) Populate `.env.local` with keys (see `.env.example`).

4) Add a hero video at `public/hero.mp4` (placeholder). If missing, the hero gracefully falls back to a static poster.

5) Run the app

```bash
pnpm dev
```

6) Deploy to Vercel. Set env vars in Vercel and enable ISR.

## Tech

- Next.js 15 (App Router, TypeScript, Server Actions)
- TailwindCSS + shadcn-style components, lucide-react, Framer Motion (subtle)
- Prisma + Postgres (provider-agnostic; local Supabase friendly)
- Resend (email) + Twilio (SMS)
- Google Places Autocomplete (split server/client keys)
- Stripe (optional refundable deposit via payment link)
- PostHog + Vercel Web Analytics
- Testing: Vitest (unit) + Playwright (E2E)

## Feature Flags & Fallbacks

- Missing keys disable features gracefully (e.g., Vision, Notifications, Places).
- `FEATURE_USE_CALENDLY=true` switches booking to Calendly via `CALENDLY_URL`.

## Scripts

- `pnpm dev`, `pnpm build`, `pnpm start`, `pnpm lint`
- `pnpm test`, `pnpm test:e2e`
- `pnpm db:push` (local), `pnpm db:migrate` (deploy), `pnpm db:seed`

## Notes

- Public pages use the provided copy bank. No lorem ipsum.
- Footer statement: "All installations by Licensed Electrical Contractors. ESA permit filed before work begins."
- A placeholder `public/hero.mp4` is expected. Replace with Sora output.
