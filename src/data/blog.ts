/* ------------------------------------------------------------------ *
 * BLOG — Surendran's published writing, synced from Medium.
 *
 * The article list in `blog.generated.json` is produced at BUILD TIME by
 * `scripts/fetch-medium.mjs` (run automatically before `vite build`, or
 * manually via `npm run sync:blog`). It pulls the Medium RSS feed and
 * normalises it to the `BlogPost` shape below, so new articles appear on
 * the next build with no code edits. The cards link out to the full
 * piece on Medium — the site CSP blocks remote images / runtime fetch /
 * embeds, so a build-time sync is the right place to do this.
 *
 * Do NOT hand-edit blog.generated.json — it is overwritten on each build.
 * ------------------------------------------------------------------ */

import generated from './blog.generated.json';

export type BlogAccent = 'indigo' | 'cyan' | 'violet' | 'amber';

export interface BlogPost {
  slug: string;
  title: string;
  url: string;          // canonical Medium article URL
  date: string;         // ISO 'YYYY-MM-DD' (used for sort + display)
  readingMinutes: number;
  excerpt: string;
  tags: string[];
  accent: BlogAccent;   // drives the card's gradient + topic icon
  image?: string;       // same-origin cover path ('/blog/…'), downloaded at build time
}

export const mediumProfile = 'https://medium.com/@surendrandigitalmarketing';

// Newest first (the generator sorts by date) — the first entry is featured.
export const blogPosts: BlogPost[] = generated as BlogPost[];

/** Human-readable article date, e.g. "1 Oct 2025". */
export const formatBlogDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
