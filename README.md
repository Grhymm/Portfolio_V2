Portfolio built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and Framer Motion.

Design reference: [tfisak.vercel.app](https://tfisak.vercel.app/)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # eslint
```

## Stack notes

- **Tailwind v4** — no `tailwind.config.ts`. Design tokens (colors, fonts) are defined as CSS custom properties in `app/globals.css` under `@theme inline`, and consumed as regular utility classes (`bg-accent`, `bg-surface`, `font-heading`, etc.).
- **Fonts** — Inter (`--font-body`, weights 400/500/600) for body text and Schibsted Grotesk (`--font-heading`, weights 400/500/600/700) for headings, both via `next/font/google`, wired in `app/layout.tsx`. A global rule applies `font-heading` to `h1`–`h6` automatically.
- **Dark mode** — forced on (`class="dark"` on `<html>`). The sidebar's theme toggle button currently only flips that class; there's no light-theme color set defined yet, so it has no visual effect until one is added.
- **Sticky hero card** — on desktop (`lg:` and up), `HeroCard` is `sticky top-24 h-fit` while the right column (`HeroContent`) scrolls past it. Both are flex children of the same row in `components/hero/Hero.tsx`; `HeroContent` needs `min-w-0` to actually shrink instead of overflowing — see the flexbox gotcha below if you touch that layout.
- **Animations** — reusable Framer Motion variants live in `lib/animations.ts` (`fadeInUp`, `fadeInLeft`, `staggerContainer`, `pulseGlow`, `spinSlow`, `floatY`, `blinkCursor`).

### Flexbox gotcha (if you edit the Hero layout)

`HeroContent` must keep `min-w-0` in its className. Flex children default to `min-width: auto`, which means they refuse to shrink below their own content's intrinsic width — without `min-w-0`, the giant heading's text pushed `HeroContent` wider than its allotted column at viewport widths around 1024–1200px, overflowing behind the sidebar. If you see similar overflow after editing this area, check `min-w-0` is still there before anything else.

## Placeholders to replace

Everything below is a stand-in and safe to search-and-replace. The design reference's own assets (for inspiration/structure only — source your own photos/renders, don't copy someone else's proprietary images) live under `https://tfisak.vercel.app/assets/images/`.

| What | Where | Notes |
|---|---|---|
| Portrait photo | `components/hero/HeroCard.tsx` → `PLACEHOLDER_IMAGE` | Currently a `placehold.co` box. Swap for a real black & white portrait (portrait orientation, subject positioned toward the top of the frame — the crop uses `object-top`). The `grayscale` class stays on unless you want a color photo. |
| Avatar | `components/hero/HeroContent.tsx` → profile header | Currently a 🧑‍💻 emoji in a rounded div. Replace with a real `next/image` avatar (~48px) once you have one. |
| 3D shape visual | `components/hero/HeroContent.tsx` → `PLACEHOLDER_3D_SHAPE` | Same `placehold.co` approach. Replace with the green glossy 3D render PNG; keep it roughly square so the floating/rotating badge overlay still lines up. |
| Name & title | `components/hero/HeroContent.tsx` | "Atarga Ondo Donel" / "UI Designer & No-Code Developer" — replace with your own. |
| Typewriter words | `components/hero/HeroCard.tsx` → `<Typewriter words={[...]} />` | Currently `["Designer", "Developer", "Donel"]`. |
| Bio paragraph | `components/hero/HeroCard.tsx` | "I help startups grow with smart design and no-code development, based in Cupertino, CA." |
| Stats | `components/hero/HeroContent.tsx` → `stats` array | "10+ Year of experience" / "6x Industry Awards" — placeholder targets for the count-up animation. |
| Client logos | `components/hero/HeroContent.tsx` → `clientLogos` / `LogoipsumMark` | Five "Logoipsum" text placeholders, duplicated into a scrolling marquee. Swap `LogoipsumMark` for real client logo SVGs/images. |
| Social links | `components/hero/HeroCard.tsx` → `socials` array | `x.com`, `instagram.com`, `linkedin.com` all point at the bare domains — update with actual profile URLs. |
| CV file | `components/hero/HeroCard.tsx` → "Download CV" link | Points at `/cv.pdf`, which doesn't exist yet — add the file to `public/cv.pdf`. |
| Sidebar navigation targets | `components/layout/Sidebar.tsx` → `navItems` | Anchors to `#about`, `#experience`, `#skills`, `#projects`, `#gallery`, `#testimonials`, `#blog`, `#contact` — only `#home` (the Hero) exists so far. Add matching `id="..."` sections as you build them out, or trim the list. |
| Page metadata | `app/layout.tsx` → `metadata` | Generic "Portfolio" title/description — update for SEO. |

## Known limitations

- The mobile header hamburger button toggles open/closed state but doesn't render a menu panel yet — no mobile nav content was specified.
- The sidebar's "active" nav highlight is set by click only, not scroll position (most sections it links to don't exist yet).
- The theme toggle doesn't switch to an actual light palette (see Dark mode note above).
