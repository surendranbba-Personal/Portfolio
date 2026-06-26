# Surendran M — Portfolio

A fast, premium single‑page portfolio, blog and downloadable résumé for **Surendran M**,
Digital Marketing Executive (Chennai, India). Built with **Vite · React · TypeScript ·
Tailwind CSS**, with every piece of copy driven from one typed source of truth so the
website, the résumé and the structured SEO data never drift out of sync.

🔗 **Live:** https://surendran-digital-portfolio.vercel.app

---

## Table of contents

- [Highlights](#highlights)
- [Tech stack](#tech-stack)
- [Quick start](#quick-start)
- [npm scripts](#npm-scripts)
- [Project structure](#project-structure)
- [How it works](#how-it-works)
  - [Data‑driven content](#1-datadriven-content)
  - [Routing & clean URLs](#2-routing--clean-urls)
  - [The blog (Medium auto‑sync)](#3-the-blog-medium-autosync)
  - [Design system](#4-design-system)
- [Editing the site](#editing-the-site)
- [Deployment](#deployment)
- [Performance, SEO & accessibility](#performance-seo--accessibility)
- [License](#license)

---

## Highlights

- **Single source of truth** — all text, roles, projects, skills and metrics live in
  [`src/data/content.ts`](src/data/content.ts). The website **and** the printable résumé
  read from it, so they can never disagree. Dates are stored once and every visible date,
  duration and "years of experience" figure is **derived automatically**.
- **Auto‑synced blog** — the `/blog` page pulls articles straight from
  [Medium](https://medium.com/@surendrandigitalmarketing) at **build time** (RSS → typed
  data + locally optimised cover images). New posts appear on the next deploy with **no
  code changes**, and a scheduled job keeps it fresh daily.
- **Premium, hand‑built UI** — liquid‑glass surfaces, scroll‑reveal animations, a magnetic
  cursor, a scroll‑progress spine, an animated mesh background and film‑grain atmosphere —
  all respecting `prefers-reduced-motion`.
- **Clean URLs** — real paths (`/`, `/blog`) via the History API, with a Vercel rewrite so
  refreshes and direct links work.
- **Downloadable résumé** — generated client‑side from the same data and opened as a
  print‑ready document ("Save as PDF").
- **SEO‑ready** — rich `<meta>` tags, Open Graph/Twitter cards and multiple JSON‑LD blocks
  (Person, Organization, LocalBusiness, FAQ) plus a strict Content‑Security‑Policy.
- **Fully responsive** and keyboard‑accessible, verified across desktop and mobile.

## Tech stack

| Area            | Choice                                                                 |
| --------------- | ---------------------------------------------------------------------- |
| Build tool      | [Vite](https://vitejs.dev) 5                                           |
| UI              | React 18 + TypeScript 5                                                |
| Styling         | Tailwind CSS 3 · fonts: Fraunces (display) + Plus Jakarta Sans (body)  |
| Animation       | Framer Motion 12                                                       |
| Icons           | lucide-react · @icons-pack/react-simple-icons (brand logos)            |
| Blog build step | fast-xml-parser (RSS) · sharp (cover image → WebP)                     |
| Linting         | ESLint 9 (typescript-eslint)                                           |
| Hosting / CI    | Vercel · GitHub Actions (scheduled blog refresh)                       |

## Quick start

```bash
npm install      # install dependencies
npm run dev      # start the dev server  → http://localhost:5173
```

Visit `/` for the portfolio and `/blog` for the blog. Then:

```bash
npm run build    # type-safe production build → dist/
npm run preview  # serve the production build locally
```

> **Requirements:** Node 18+ (the blog sync script uses the global `fetch` and
> `AbortSignal.timeout`).

## npm scripts

| Script              | What it does                                                              |
| ------------------- | ------------------------------------------------------------------------ |
| `npm run dev`       | Start the Vite dev server with HMR.                                       |
| `npm run build`     | Run `prebuild` (blog sync) then build to `dist/`.                         |
| `npm run preview`   | Locally serve the production build.                                       |
| `npm run lint`      | Lint the project with ESLint.                                            |
| `npm run sync:blog` | Manually re‑pull the latest Medium posts into `src/data/blog.generated.json`. |
| `prebuild`          | Runs automatically before `build` — executes the blog sync.              |

## Project structure

```
.
├── .github/workflows/
│   └── refresh-blog.yml         # daily job: pings a Vercel deploy hook to re-sync the blog
├── public/
│   ├── blog/                    # cover images downloaded from Medium (WebP, build output)
│   ├── photos/ · projects/      # section & project imagery
│   ├── surendran.webp           # portrait
│   └── og-image.png, favicons, manifest.json, ga-init.js …
├── scripts/
│   └── fetch-medium.mjs         # build-time: Medium RSS → blog.generated.json + cover images
├── src/
│   ├── main.tsx                 # React entry point
│   ├── Root.tsx                 # top-level route switch (home ⇆ blog)
│   ├── App.tsx                  # the home page (all portfolio sections)
│   ├── lib/
│   │   └── router.ts            # tiny History-API router (useRoute + navigate)
│   ├── pages/
│   │   └── BlogPage.tsx         # the /blog page
│   ├── components/
│   │   ├── motion.tsx           # Reveal / WordReveal / CountUp / Magnetic … animation primitives
│   │   ├── cards.tsx            # Eyebrow, TimelineCard, RichBlockCard
│   │   ├── sections.tsx         # StatementBand, BentoGrid, BeforeAfterSlider, ProjectsLineup, Faq
│   │   ├── chrome.tsx           # ScrollSpine, AvailabilityBar, WhatsAppFab
│   │   ├── atmosphere.tsx       # Grain + scroll-driven MoodBackground
│   │   ├── brand.tsx            # tool brand logos (PillMark, LogoMarquee)
│   │   ├── blog.tsx             # BlogCard, FeaturedBlogCard, MediumIcon
│   │   ├── CursorGlow.tsx · ContactForm.tsx · ResumeModal.tsx · LineChart.tsx
│   ├── data/
│   │   ├── content.ts           # SINGLE SOURCE OF TRUTH — all copy + numbers
│   │   ├── blog.ts              # blog types + re-exports the generated post list
│   │   ├── blog.generated.json  # auto-generated Medium posts (committed as a seed/fallback)
│   │   └── resume.ts            # builds the printable "Save as PDF" résumé
│   └── styles/
│       └── index.css            # Tailwind layers + custom glass / atmosphere CSS
├── index.html                   # HTML entry + SEO meta + JSON-LD + Content-Security-Policy
├── vercel.json                  # security headers + SPA rewrite + long-cache for /assets
└── …config (vite, tailwind, postcss, eslint, tsconfig)
```

## How it works

### 1. Data‑driven content

[`src/data/content.ts`](src/data/content.ts) is the only place copy and numbers live.
Roles store dates as `YYYY-MM`; helpers derive the displayed date ranges, durations and the
total years of experience, so nothing goes stale. Both the rendered site and the
downloadable résumé ([`src/data/resume.ts`](src/data/resume.ts)) consume this file, so they
always match. The on‑page FAQ is mirrored by a JSON‑LD `FAQPage` block in `index.html`.

### 2. Routing & clean URLs

A minimal router ([`src/lib/router.ts`](src/lib/router.ts)) uses the **History API** for
clean paths — `/` (home) and `/blog`. [`src/Root.tsx`](src/Root.tsx) switches between
`App` and `BlogPage` based on the current path. Direct loads and refreshes of `/blog` work
because:

- locally, Vite's dev server and `vite preview` fall back to `index.html`;
- in production, `vercel.json` rewrites non‑file paths to `index.html` (real static files —
  JS, CSS, images — are served first, so they're never rewritten).

### 3. The blog (Medium auto‑sync)

The blog is sourced from Medium **at build time** — there is no runtime fetch (the strict
CSP blocks third‑party requests, and this keeps the site fully static and fast).

**Pipeline:** [`scripts/fetch-medium.mjs`](scripts/fetch-medium.mjs) runs as the `prebuild`
hook on every `npm run build`:

1. Fetches the Medium RSS feed and normalises each post (title, link, date, tags, reading
   time, excerpt from the first paragraphs).
2. Downloads each cover image and converts it to a small **WebP** with `sharp`, saving it
   to `public/blog/` so it's served same‑origin (satisfies the CSP).
3. Writes [`src/data/blog.generated.json`](src/data/blog.generated.json), which
   [`src/data/blog.ts`](src/data/blog.ts) imports.

It's resilient: if Medium is unreachable, the last‑known‑good JSON (committed as a seed) is
kept, so a build never breaks. The newest post is featured automatically.

**Add a post:** just publish on Medium — it appears on the next build. To refresh locally,
run `npm run sync:blog`.

**Daily auto‑refresh:** [`.github/workflows/refresh-blog.yml`](.github/workflows/refresh-blog.yml)
runs on a schedule and pings a Vercel **Deploy Hook**, triggering a redeploy that re‑syncs
the blog. One‑time setup:

1. Vercel → Project → **Settings → Git → Deploy Hooks** → create a hook for `main`, copy the URL.
2. GitHub → repo → **Settings → Secrets and variables → Actions** → add a secret named
   `VERCEL_DEPLOY_HOOK_URL` with that URL.

### 4. Design system

- **Animation primitives** in [`components/motion.tsx`](src/components/motion.tsx)
  (`Reveal`, `WordReveal`, `LetterReveal`, `CountUp`, `ScrollZoom`, `Magnetic`) — every one
  collapses to a simple fade under `prefers-reduced-motion`.
- **Glass + atmosphere** — reusable `.glass-card` / `.glass-btn` / `.pill-glass` surfaces,
  an animated mesh background, film grain and a scroll‑driven mood background in
  [`styles/index.css`](src/styles/index.css) and
  [`components/atmosphere.tsx`](src/components/atmosphere.tsx).
- **Type & colour** — Fraunces for display headings, Plus Jakarta Sans for body; an
  indigo → blue → cyan → violet accent palette used sparingly.

## Editing the site

| To change…                | Edit…                                                              |
| ------------------------- | ----------------------------------------------------------------- |
| Any copy / numbers / role | [`src/data/content.ts`](src/data/content.ts)                      |
| Résumé output             | [`src/data/resume.ts`](src/data/resume.ts)                        |
| Blog posts                | Publish on Medium (auto‑synced) — or edit `blogPosts` shape in [`src/data/blog.ts`](src/data/blog.ts) |
| Section order / layout    | [`src/App.tsx`](src/App.tsx)                                      |
| Colours, glass, animation | [`src/styles/index.css`](src/styles/index.css)                   |
| SEO / meta / JSON‑LD      | [`index.html`](index.html)                                        |
| Portrait / images         | `public/` (`surendran.webp`, `photos/`, `projects/`)             |

## Deployment

`npm run build` outputs a static site to `dist/`, ready for any static host. The project
is configured for **Vercel** via [`vercel.json`](vercel.json):

- **SPA rewrite** — non‑file paths fall back to `index.html` (so `/blog` is refresh‑safe).
- **Security headers** — `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`,
  `Permissions-Policy`, HSTS (these complement the page‑level CSP in `index.html`).
- **Caching** — fingerprinted assets under `/assets` are cached `immutable` for a year.

Pushing to `main` triggers a production deploy, whose build re‑syncs the blog from Medium.

## Performance, SEO & accessibility

- Cover images are resized and converted to WebP at build time (~90% smaller than the
  source PNGs) and lazy‑loaded in the grid.
- Strict Content‑Security‑Policy; analytics is loaded from a same‑origin init file.
- Every image has an `alt`; interactive controls are real buttons/links with labels; one
  `<h1>` per page; full keyboard focus states.
- All motion honours `prefers-reduced-motion`.

## License

Personal project — all content and branding © Surendran M. The source is shared for
reference; please don't reuse the personal content or imagery without permission.
