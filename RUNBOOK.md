# ConnectEV — Runbook

## Prod DB Init
1) Set `DATABASE_URL` for production in your shell (never commit secrets):
```
export DATABASE_URL="postgresql://…?schema=public"
```
2) Generate client and deploy migrations:
```
pnpm db:generate
pnpm prisma migrate deploy
pnpm db:seed
```

## Rotate Env Keys
- Update keys in Vercel Project Settings → Environment Variables (Production + Preview)
- Trigger a redeploy (git push or Vercel “Redeploy”)
- For Supabase storage service role rotation, rotate the key in Supabase and update `SUPABASE_SERVICE_ROLE_KEY` in Vercel

## Preview Screenshots
```
pnpm dev             # start app
pnpm exec playwright install  # first time only
pnpm preview:shots   # writes PNGs to ./previews
```

## Toggle Calendly/Flags
- Calendly: set `FEATURE_USE_CALENDLY=true` and `CALENDLY_URL=https://calendly.com/connectevchargers/30min`
- Launch Mode:
  - `ADDRESS_PROVIDER=none`
  - `WIZARD_SIMPLE=true`
  - `AI_PANEL_ANALYZER=false`
  - `NEXT_PUBLIC_DEPOSITS_ENABLED=false`
  - `PARTNER_PORTAL=false`
## Database URL (Vercel)
- Prisma reads `env("DATABASE_URL")` from `prisma/schema.prisma`.
- In Vercel, set `DATABASE_URL` to the Supabase **Session Pooler** URI (not Transaction Pooler).
- Using the Transaction Pooler can break Prisma; Session Pooler is required for stability.
