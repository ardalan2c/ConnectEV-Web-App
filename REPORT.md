# Vercel Build Readiness Report

## App Root
- APP_ROOT = .
- Why: Repository root contains Next.js signs:
  - Has `app/` directory (App Router)
  - Has `next.config.ts`
  - Has `tsconfig.json`
  - Root `package.json` depends on `next`

## Package.json (at APP_ROOT)
- next: 15.0.3
- react: 18.3.1
- react-dom: 18.3.1
- scripts:
  - dev: next dev
  - build: next build
  - start: next start -p 3000
  - postinstall: prisma generate
  - db:generate: prisma generate
  - db:migrate: prisma migrate deploy
  - db:seed: node prisma/seed.mjs
- top-level:
  - private: true
  - packageManager: pnpm@8
  - engines.node: ">=18.18 <23"

## Minimal Configs
- next.config.ts: present (strict mode enabled; MDX integration)
- tsconfig.json: present
- .gitignore: contains .env*, .next, node_modules
- vercel.json: added to enforce Next.js framework and commands

## Workspace/Monorepo
- No pnpm-workspace.yaml detected; single app at repo root

## Local Verify
- pnpm install → OK
- pnpm db:generate → OK
- pnpm build → OK (Next.js 15)

## Vercel Settings
- Framework Preset: Next.js
- Root Directory: (leave blank)
- Install Command: pnpm install
- Build Command: pnpm build
- Output Directory: .next (default)

## After Deploy
- Set `NEXT_PUBLIC_SITE_URL` to your live domain
- One-time prod DB init (run locally with prod `DATABASE_URL` set):
  export DATABASE_URL="postgresql://…?schema=public"
  pnpm db:generate
  pnpm prisma migrate deploy
  pnpm db:seed

## Files Changed
- package.json (scripts.postinstall → prisma generate)
- vercel.json (new)
- REPORT.md (this file)

## Root Cause (likely) and Fix
- Cause: Vercel could not detect a Next.js app because the Root Directory was ambiguous or missing framework hint.
- Fix: Confirmed repo root is the Next.js app; ensured Next.js dependencies and scripts; added `vercel.json` to declare framework and commands.
