/* ------------------------------------------------------------------ *
 * BLOG PAGE — the dedicated '/blog' route. Mirrors the portfolio's
 * atmosphere (grain, mood background, cursor glow, scroll progress) and
 * glass design language, but stands on its own with a slim navbar that
 * returns to the portfolio. The latest article is featured; the rest sit
 * in a grid. Every card links out to the full piece on Medium.
 * ------------------------------------------------------------------ */

import { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, BookOpen, Sparkles } from 'lucide-react';
import { profile, currentYear } from '../data/content';
import { blogPosts, mediumProfile } from '../data/blog';
import { Grain, MoodBackground } from '../components/atmosphere';
import { CursorGlow } from '../components/CursorGlow';
import { Footer } from '../components/Footer';
import { Reveal, RevealHeading, WordReveal } from '../components/motion';
import { Eyebrow } from '../components/cards';
import { BlogCard, FeaturedBlogCard, MediumIcon } from '../components/blog';
import { navigate } from '../lib/router';

export function BlogPage() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  // Give the blog its own browser-tab title; restore on navigating away.
  useEffect(() => {
    const previous = document.title;
    document.title = 'Blog — Surendran M | Digital Marketing Insights';
    return () => {
      document.title = previous;
    };
  }, []);

  const [featured, ...rest] = blogPosts;

  const followBtn = (
    <a href={mediumProfile} target="_blank" rel="noreferrer" className="glass-btn !px-5 !py-2.5 text-sm">
      <MediumIcon className="h-4 w-4" /> Follow on Medium
    </a>
  );

  return (
    <div className="relative">
      <CursorGlow />
      <Grain />
      <MoodBackground />

      {/* colourful animated background (matches the portfolio) */}
      <div className="app-bg">
        <div className="blob w-80 h-80 bg-indigo-300 top-10 -left-10 float-slow" />
        <div className="blob w-72 h-72 bg-cyan-300 top-1/3 right-0 float" />
        <div className="blob w-80 h-80 bg-fuchsia-300 bottom-20 left-1/4 float-slow" />
      </div>

      {/* scroll progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 origin-left z-[60] gradient-primary"
        style={{ scaleX: progress }}
      />

      {/* ---------------- NAVBAR ---------------- */}
      <nav className="fixed w-full z-50 glass-nav">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
          <button onClick={() => navigate('/')} className="group flex items-center gap-2.5">
            <img src="/favicon.png" alt="Brand favicon" className="h-7 w-7 object-contain" />
            <span className="font-display text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">
              {profile.name}
            </span>
          </button>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => navigate('/')}
              className="hidden items-center gap-2 px-1 text-slate-600 transition-colors hover:text-slate-900 sm:inline-flex"
            >
              <ArrowLeft className="h-4 w-4" /> Portfolio
            </button>
            {followBtn}
          </div>
        </div>
      </nav>

      {/* ---------------- HEADER ---------------- */}
      <header className="relative overflow-hidden pt-32 pb-10 md:pt-40 md:pb-14">
        <div className="absolute -inset-y-10 inset-x-0 dot-pattern opacity-50" />
        <div className="relative mx-auto max-w-6xl px-4 text-center">
          <Eyebrow icon={Sparkles}>The Blog</Eyebrow>
          <h1 className="text-fluid-hero font-extrabold font-display text-gradient animate-gradient">
            Insights &amp; Ideas
          </h1>
          <WordReveal
            className="mx-auto mt-5 max-w-2xl text-lg text-slate-600"
            text="Practical, no-fluff notes on SEO, paid media, e-commerce and digital growth — drawn from real campaigns and published on Medium."
          />

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href={mediumProfile} target="_blank" rel="noreferrer" className="glass-btn">
              <MediumIcon className="h-4 w-4" /> Read on Medium <ArrowUpRight className="h-4 w-4" />
            </a>
            <button onClick={() => navigate('/')} className="glass-btn-ghost">
              <ArrowLeft className="h-4 w-4" /> Back to portfolio
            </button>
          </div>

          <div className="mx-auto mt-10 flex max-w-md justify-center gap-10">
            <div>
              <p className="text-2xl font-extrabold text-gradient">{blogPosts.length}</p>
              <p className="mt-1 text-xs text-slate-500">Articles</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-gradient">Weekly-ish</p>
              <p className="mt-1 text-xs text-slate-500">Fresh writing</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-gradient">Medium</p>
              <p className="mt-1 text-xs text-slate-500">Published on</p>
            </div>
          </div>
        </div>
      </header>

      {/* ---------------- FEATURED ---------------- */}
      <section className="mx-auto max-w-6xl px-4 pb-4">
        <FeaturedBlogCard post={featured} />
      </section>

      {/* ---------------- ALL ARTICLES ---------------- */}
      {rest.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 section-spacing pt-10">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <Eyebrow icon={BookOpen}>More reading</Eyebrow>
              <RevealHeading className="text-fluid-h2 font-bold font-display text-gradient">
                All articles
              </RevealHeading>
            </div>
            <a
              href={mediumProfile}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 sm:inline-flex"
            >
              View on Medium <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {rest.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* ---------------- FOLLOW CTA ---------------- */}
      <section className="mx-auto max-w-6xl px-4 section-spacing pt-4">
        <Reveal className="block">
          <div className="glass-card glass-sheen relative overflow-hidden p-8 text-center md:p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-400/10" />
            <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white/70">
              <MediumIcon className="h-7 w-7 text-slate-900" />
            </span>
            <h2 className="relative mt-5 text-fluid-h2 font-bold font-display text-gradient">
              Never miss a new article
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-slate-600">
              I publish practical, hands-on digital-marketing guides on Medium. Follow along to get each
              new piece as it lands.
            </p>
            <div className="relative mt-7 flex flex-wrap justify-center gap-4">
              <a href={mediumProfile} target="_blank" rel="noreferrer" className="glass-btn">
                <MediumIcon className="h-4 w-4" /> Follow on Medium <ArrowUpRight className="h-4 w-4" />
              </a>
              <button onClick={() => navigate('/')} className="glass-btn-ghost">
                Explore the portfolio
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
