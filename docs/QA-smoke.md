# ConnectEV — QA Smoke Test Checklist

## Preprod Setup
- [ ] Copy `.env.example` to `.env.local` and fill values
- [ ] Run `pnpm install` and `pnpm db:generate`
- [ ] `public/hero.mp4` present (or graceful fallback working)
- [ ] Database migrated & seeded (`pnpm db:seed`)

## Landing Page (/)
- [ ] Sticky header with glass background (no jitter on scroll)
- [ ] Header shows: Call/Text buttons (desktop), single Call (mobile)
- [ ] Hero H1 matches copy bank: "Fast, code-compliant EV-charger installs across the GTA"
- [ ] Hero video plays with low opacity (0.1) or shows gradient fallback
- [ ] Three pills visible: "ESA Permit Included", "Licensed Electrical Contractors", "2-Year Workmanship Warranty"
- [ ] Quote preview card shows: "1) Address 2) Run length 3) Panel photos" and "$1,100–$2,200 + HST"
- [ ] Services section: "Home Level-2 Chargers", "Condos & Apartments", "Panel & Service Upgrades"
- [ ] Process section: "1) Instant Quote", "2) Virtual Check", "3) ESA Permit", "4) Install Day"
- [ ] Smarter section with AI analyzer preview
- [ ] City chips render all GTA cities (Toronto, North York, etc.)
- [ ] FAQ accordions expand/collapse with aria-expanded
- [ ] Final CTA section with green button
- [ ] Footer compliance: "All installations by Licensed Electrical Contractors. ESA permit filed before work begins."
- [ ] Skip to content link appears on tab focus
- [ ] JSON-LD present (view-source search for `LocalBusiness`)

## Quote Wizard (/quote)
### Step 1: Contact & Address
- [ ] Form shows "Step 1 of 3"
- [ ] All fields required: First, Last, Email, Phone, Address
 - [ ] Address field is plain text in Launch Mode
- [ ] CASL checkbox required with proper text
- [ ] "Next: Run length" button disabled until all fields filled

### Step 2: Installation Details  
- [ ] Run length slider (3-30m) updates price band in real-time
- [ ] Two checkboxes: "Exterior wall penetration" and "Finished walls"
- [ ] Price preview shows: "Estimated: $XXX–$XXX + HST"
- [ ] Back/Next buttons work correctly

### Step 3: Panel Photos
- [ ] Photo dropzone accepts 3 images, compresses HEIC→JPG
- [ ] Required photos list clearly shown
- [ ] "Get My Quote" disabled until 3 photos uploaded
- [ ] Submit button shows "Submitting..." state

### Step 4: Result Screen
- [ ] Shows price band prominently
- [ ] "What happens next?" section with 3 steps
- [ ] Two CTAs: "Book 15-min virtual check" and "We'll text you in ~15 min"
- [ ] Mobile keyboard spacer prevents button hiding

## Mobile Responsiveness
- [ ] All content readable on 390px width (iPhone 12 mini)
- [ ] Touch targets min 44px (especially form inputs)
- [ ] No horizontal scroll on any page
- [ ] Header collapses appropriately 
- [ ] Quote wizard stacks properly on mobile
- [ ] Buttons remain accessible above mobile keyboard

## Performance & SEO
- [ ] LCP under 2.5s (Lighthouse mobile)
- [ ] Hero video doesn't block page render
- [ ] All images use next/image with priority
- [ ] Sitemap accessible at /sitemap.xml
- [ ] Robots.txt accessible at /robots.txt
- [ ] Meta tags present on all pages

## Visual Previews Generation
```bash
# After starting dev server (pnpm dev):
pnpm preview:shots

# Expected outputs:
# previews/landing-desktop.png (1440x900)
# previews/landing-mobile.png (390x844)  
# previews/quote-desktop.png (1440x900)
# previews/quote-mobile.png (390x844)
```

## Launch Readiness
- [ ] All SIMPLE_MODE flags respected (no AI surfaced in UI)
- [ ] No Stripe deposits shown when NEXT_PUBLIC_DEPOSITS_ENABLED=false
- [ ] All placeholder phone numbers updated to real numbers
- [ ] Error boundaries handle API failures gracefully
- [ ] 404 page exists and is branded
