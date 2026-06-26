/* ------------------------------------------------------------------ *
 * FETCH MEDIUM — build-time blog sync. Runs before `vite build` (and via
 * `npm run sync:blog`), pulls Surendran's Medium RSS feed, normalises it
 * into the BlogPost shape the site expects and writes
 * src/data/blog.generated.json.
 *
 * Resilient by design: if the feed can't be reached or returns nothing
 * usable, the existing generated file is LEFT UNTOUCHED (last-known-good),
 * so a network blip during a deploy can never break the build or wipe the
 * blog. A seed file is committed so local dev works offline too.
 * ------------------------------------------------------------------ */

import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import { XMLParser } from 'fast-xml-parser';

const FEED_URL = 'https://medium.com/feed/@surendrandigitalmarketing';
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'src/data/blog.generated.json');
const IMG_DIR = join(ROOT, 'public/blog'); // cover images saved here → served same-origin
const UA = { 'User-Agent': 'portfolio-build/1.0 (+blog-sync)' };

// Card accents cycle in this order (newest post first → indigo).
const ACCENTS = ['indigo', 'cyan', 'violet', 'amber'];

// Tag words that should stay fully capitalised when prettified.
const ACRONYMS = new Set(['seo', 'ppc', 'sem', 'cro', 'ux', 'ui', 'ai', 'roi', 'b2b', 'b2c', 'saas', 'ai/ml']);

const stripHtml = (html = '') =>
  html
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<figure[\s\S]*?<\/figure>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&rsquo;|&lsquo;/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .replace(/&hellip;/g, '…')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);

const prettifyTag = (t) =>
  t
    .split(/[-\s]+/)
    .filter(Boolean)
    .map((w) => (ACRONYMS.has(w.toLowerCase()) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ');

const toExcerpt = (text, max = 220) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 80 ? lastSpace : max).trim()}…`;
};

const readingMinutes = (text) => Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 200));

// Pull the article's <p> paragraphs (skips the title/subtitle headings and
// figures Medium puts at the top of content:encoded) for a clean excerpt.
const paragraphs = (html = '') =>
  [...String(html).matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m) => stripHtml(m[1]))
    .filter((t) => t.length > 0);

// The cover image is the first real <img> in content:encoded (Medium leads
// with a <figure><img …> for the featured image). We skip Medium's invisible
// tracking/stat pixel — otherwise a post with no cover would "download" that.
// Returns '' if there's no usable image.
const firstImage = (html = '') => {
  const srcs = [...String(html).matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map((m) =>
    m[1].replace(/&amp;/g, '&')
  );
  const real = srcs.find((s) => /(cdn-images-1|miro)\.medium\.com/.test(s) && !/\/_\/stat/.test(s));
  return real ?? srcs.find((s) => !/\/_\/stat/.test(s)) ?? '';
};

const extFromContentType = (ct = '') =>
  ct.includes('png') ? 'png' : ct.includes('webp') ? 'webp' : ct.includes('gif') ? 'gif' : ct.includes('svg') ? 'svg' : 'jpg';

// Ask Medium's CDN for a card-sized image instead of the full-res original,
// which keeps the downloaded covers light (both known CDN URL shapes).
const shrinkMediumUrl = (url = '') =>
  url
    .replace(/(cdn-images-1\.medium\.com\/)max\/\d+\//, '$1max/800/')
    .replace(/(miro\.medium\.com\/v2\/)resize:[a-z]+:\d+\//i, '$1resize:fit:800/');

// sharp resizes + converts covers to WebP at build time (≈70-80% smaller than
// the original PNG/JPG). It's optional: if it can't be loaded we fall back to
// saving the raw image, so the build still succeeds either way.
let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  sharp = null;
  console.warn('[blog-sync] sharp unavailable — saving covers in their original format.');
}

// Download a cover image to public/blog/<slug>.<ext>; returns the same-origin
// path ('/blog/…') or '' on any failure (card then falls back to a gradient).
async function downloadImage(url, slug) {
  if (!url) return '';
  try {
    const res = await fetch(shrinkMediumUrl(url), { headers: UA, signal: AbortSignal.timeout(20000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const input = Buffer.from(await res.arrayBuffer());
    mkdirSync(IMG_DIR, { recursive: true });

    if (sharp) {
      try {
        const webp = await sharp(input)
          .resize({ width: 800, withoutEnlargement: true })
          .webp({ quality: 74 })
          .toBuffer();
        writeFileSync(join(IMG_DIR, `${slug}.webp`), webp);
        return `/blog/${slug}.webp`;
      } catch (e) {
        console.warn(`[blog-sync] webp conversion failed for "${slug}" (${e.message}); keeping original.`);
      }
    }

    const ext = extFromContentType(res.headers.get('content-type') || '');
    writeFileSync(join(IMG_DIR, `${slug}.${ext}`), input);
    return `/blog/${slug}.${ext}`;
  } catch (err) {
    console.warn(`[blog-sync] cover image failed for "${slug}" (${err.message}). Using gradient.`);
    return '';
  }
}

const asArray = (v) => (Array.isArray(v) ? v : v == null ? [] : [v]);

function normalise(items) {
  return items.map((item, i) => {
    const title = stripHtml(String(item.title ?? '')).trim();
    const url = String(item.link ?? '').split('?')[0]; // drop ?source=rss… tracking
    const bodyHtml = item['content:encoded'] ?? item.description ?? '';
    const fullText = stripHtml(String(bodyHtml)); // for reading-time word count
    const paras = paragraphs(bodyHtml);
    // First substantial paragraph(s) → excerpt; fall back to the full text.
    const excerptSource = paras.length ? paras.slice(0, 2).join(' ') : fullText;
    const date = item.pubDate ? new Date(item.pubDate).toISOString().slice(0, 10) : '';

    const tags = asArray(item.category)
      .map((c) => prettifyTag(String(typeof c === 'object' ? (c['#text'] ?? '') : c)))
      .filter(Boolean)
      .slice(0, 4);

    return {
      slug: slugify(title) || `post-${i}`,
      title,
      url,
      date,
      readingMinutes: readingMinutes(fullText),
      excerpt: toExcerpt(excerptSource),
      tags,
      accent: ACCENTS[i % ACCENTS.length],
      _cover: firstImage(bodyHtml), // transient: raw URL, replaced with local path below
    };
  });
}

async function main() {
  let xml;
  try {
    const res = await fetch(FEED_URL, { headers: UA, signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    xml = await res.text();
  } catch (err) {
    console.warn(`[blog-sync] Could not reach Medium (${err.message}). Keeping existing posts.`);
    if (!existsSync(OUT)) {
      console.error('[blog-sync] No generated file exists yet — writing an empty list.');
      writeFileSync(OUT, '[]\n');
    }
    return; // leave last-known-good in place
  }

  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '', textNodeName: '#text' });
  const feed = parser.parse(xml);
  const items = asArray(feed?.rss?.channel?.item);

  const posts = normalise(items).filter((p) => p.title && p.url && p.date);

  if (posts.length === 0) {
    console.warn('[blog-sync] Feed returned no usable items. Keeping existing posts.');
    if (!existsSync(OUT)) writeFileSync(OUT, '[]\n');
    return;
  }

  // Newest first (Medium already orders this way, but be explicit).
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));

  // Download cover images in parallel, then swap the raw URL for the local path.
  await Promise.all(
    posts.map(async (p) => {
      p.image = await downloadImage(p._cover, p.slug);
      delete p._cover;
      if (!p.image) delete p.image; // omit the field entirely when there's no image
    })
  );

  const withImages = posts.filter((p) => p.image).length;
  writeFileSync(OUT, `${JSON.stringify(posts, null, 2)}\n`);
  console.log(`[blog-sync] Wrote ${posts.length} post(s) (${withImages} with cover image) to src/data/blog.generated.json`);
}

main();
