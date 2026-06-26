/* ------------------------------------------------------------------ *
 * BLOG CARDS — the building blocks shared by the dedicated blog page and
 * the "From the Blog" teaser on the home page. Cards link straight out to
 * the Medium article (the site CSP blocks remote cover images), so each
 * one uses an accent gradient + topic icon header instead of a photo.
 * ------------------------------------------------------------------ */

import type { LucideIcon } from 'lucide-react';
import { Calendar, Clock, ArrowUpRight, Star, Rocket, Compass, Lightbulb, PenLine } from 'lucide-react';
import { Reveal } from './motion';
import { formatBlogDate } from '../data/blog';
import type { BlogPost, BlogAccent } from '../data/blog';

/** Official Medium "M" monogram (transparent background). The icon pack's
 *  SiMedium is a filled rounded-square badge that turns into a white box when
 *  drawn in white — this clean wordmark mark renders crisply in currentColor. */
export function MediumIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M2.846 6.887c.03-.295-.083-.586-.303-.784L.275 3.357V3h6.954l5.378 11.795L17.367 3h6.632v.357l-1.913 1.84a.56.56 0 0 0-.213.537v13.498a.56.56 0 0 0 .213.537l1.87 1.84V21H14.55v-.39l1.937-1.885c.19-.19.19-.246.19-.537V7.41l-5.389 13.688h-.728L4.28 7.41v9.174c-.052.385.076.774.347 1.05l2.52 3.06V21H0v-.39l2.52-3.06a1.3 1.3 0 0 0 .326-1.05z" />
    </svg>
  );
}

// Accent → header gradient. Tuned to the site's indigo→cyan→violet palette.
const ACCENT_GRADIENT: Record<BlogAccent, string> = {
  indigo: 'from-indigo-500 via-blue-500 to-cyan-400',
  cyan: 'from-cyan-500 via-sky-500 to-blue-500',
  violet: 'from-violet-500 via-fuchsia-500 to-indigo-500',
  amber: 'from-amber-400 via-orange-400 to-rose-400',
};

// Accent → topic icon shown ghosted in the header band.
const ACCENT_ICON: Record<BlogAccent, LucideIcon> = {
  indigo: Rocket,
  cyan: Compass,
  violet: Lightbulb,
  amber: PenLine,
};

function MetaRow({ post }: { post: BlogPost }) {
  return (
    <div className="flex items-center gap-4 text-xs text-slate-500">
      <span className="inline-flex items-center gap-1.5">
        <Calendar className="w-3.5 h-3.5" /> {formatBlogDate(post.date)}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5" /> {post.readingMinutes} min read
      </span>
    </div>
  );
}

function Tags({ items, max = 3 }: { items: string[]; max?: number }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.slice(0, max).map((t) => (
        <span key={t} className="px-2.5 py-1 pill-glass text-xs text-slate-600">
          {t}
        </span>
      ))}
    </div>
  );
}

/** Standard article card — gradient header, meta, title, excerpt, tags and
 *  a "Read on Medium" affordance. The whole card is the link. */
export function BlogCard({ post, index = 0 }: { post: BlogPost; index?: number }) {
  const Icon = ACCENT_ICON[post.accent];
  return (
    <Reveal direction="up" delay={index * 0.06} className="h-full">
      <a
        href={post.url}
        target="_blank"
        rel="noreferrer"
        className="group glass-card glass-hover glass-sheen flex h-full flex-col overflow-hidden"
      >
        <div className={`relative aspect-[16/9] overflow-hidden bg-gradient-to-br ${ACCENT_GRADIENT[post.accent]}`}>
          {post.image ? (
            <img
              src={post.image}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <>
              <div className="absolute inset-0 dot-pattern opacity-20" />
              <Icon className="absolute -bottom-3 -right-2 h-24 w-24 text-white/25" />
            </>
          )}
          {/* subtle top scrim keeps the white badge legible over bright covers */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent" />
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/35 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            <MediumIcon className="h-3.5 w-3.5" /> Article
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <MetaRow post={post} />
          <h3 className="mt-3 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600">
            {post.title}
          </h3>
          <p className="mt-2 flex-1 text-sm text-slate-600">{post.excerpt}</p>
          <div className="mt-4">
            <Tags items={post.tags} />
          </div>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600">
            Read on Medium
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </a>
    </Reveal>
  );
}

/** Featured (latest) article — a wide two-column card: gradient panel on
 *  the left, full copy on the right. Used at the top of the blog page. */
export function FeaturedBlogCard({ post }: { post: BlogPost }) {
  const Icon = ACCENT_ICON[post.accent];
  return (
    <Reveal direction="up" className="block">
      <a
        href={post.url}
        target="_blank"
        rel="noreferrer"
        className="group glass-card glass-hover glass-sheen grid overflow-hidden md:grid-cols-2"
      >
        <div className={`relative flex min-h-[15rem] flex-col justify-between overflow-hidden bg-gradient-to-br ${ACCENT_GRADIENT[post.accent]} p-8`}>
          {post.image ? (
            <>
              <img
                src={post.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* dark only at the top/bottom edges so the cover stays clear in the middle */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/45" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 dot-pattern opacity-20" />
              <Icon className="absolute -bottom-6 -right-4 h-44 w-44 text-white/20" />
            </>
          )}
          <span className="relative inline-flex w-fit items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            <Star className="h-3.5 w-3.5" /> Latest article
          </span>
          <p className="relative inline-flex items-center gap-2 text-sm font-medium text-white/90">
            <MediumIcon className="h-4 w-4" /> Published on Medium
          </p>
        </div>
        <div className="flex flex-col p-7 md:p-9">
          <MetaRow post={post} />
          <h3 className="mt-3 font-display text-2xl font-bold text-slate-900 transition-colors group-hover:text-blue-600">
            {post.title}
          </h3>
          <p className="mt-3 flex-1 text-slate-600">{post.excerpt}</p>
          <div className="mt-5">
            <Tags items={post.tags} max={4} />
          </div>
          <span className="glass-btn mt-6 w-fit !py-2.5 text-sm">
            Read the full article <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </a>
    </Reveal>
  );
}
