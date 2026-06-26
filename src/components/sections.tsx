/* ------------------------------------------------------------------ *
 * SHOWPIECE SECTIONS — the Apple-grade additions: a full-bleed
 * statement band, a bento grid, a draggable before/after slider, a
 * hover-reveal projects lineup with focus-trapped lightbox, and an
 * accessible FAQ accordion. Every figure is reused from real metrics.
 * ------------------------------------------------------------------ */

import { useEffect, useRef, useState } from 'react';
import type { PointerEvent, KeyboardEvent } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Plus, X, ArrowRight, Quote, MoveHorizontal, Sparkles } from 'lucide-react';
import { statement, bento, beforeAfterStats, faqs, testimonials } from '../data/content';
import type { SectionBlock } from '../data/content';
import { Reveal, CountUp, WordReveal } from './motion';
import { PillMark } from './brand';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------------- Full-bleed statement band ---------------- */
export function StatementBand() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [70, -70]);
  // cinematic scrubbed zoom — pushes in hard toward the centre of the band
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [0.82, 1, 1.14]);
  // the big number fades up out of a slight blur as it grows
  const blur = useTransform(scrollYProgress, [0, 0.5], reduce ? ['blur(0px)', 'blur(0px)'] : ['blur(10px)', 'blur(0px)']);

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-40" />
      <motion.div style={{ y, scale }} className="relative max-w-5xl mx-auto px-4 text-center">
        <motion.p
          style={{ filter: blur }}
          className="text-fluid-hero font-extrabold font-display text-gradient animate-gradient leading-none"
        >
          <CountUp value={statement.value} />
        </motion.p>
        <WordReveal className="mt-3 text-2xl md:text-4xl font-display font-bold text-slate-800" text={statement.lead} stagger={0.06} />
        <p className="mt-5 max-w-2xl mx-auto text-lg text-slate-600">{statement.tail}</p>
      </motion.div>
    </section>
  );
}

/* ---------------- Bento grid ---------------- */
export function BentoGrid() {
  const t = testimonials[0];
  const shortQuote = `${t.quote.split('. ')[0]}.`;

  const StatTile = ({ stat, delay }: { stat: typeof bento.primaryStat; delay: number }) => (
    <Reveal direction="down" delay={delay} className="h-full">
      <div className="glass-card glass-hover h-full p-6 flex flex-col justify-center min-h-[130px]">
        <p className="text-3xl font-extrabold text-gradient">
          <CountUp value={stat.value} />
        </p>
        <p className="text-sm text-slate-600 mt-1">{stat.label}</p>
        <p className="text-xs text-emerald-600 font-semibold mt-1">{stat.change}</p>
      </div>
    </Reveal>
  );

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      <Reveal scale direction="up" className="col-span-2 lg:row-span-2">
        <div className="glass-card glass-sheen bento-flagship h-full p-7 md:p-9 flex flex-col justify-between min-h-[260px]">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full pill-glass text-blue-600 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> {bento.flagship.eyebrow}
            </span>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mt-5 leading-snug">
              {bento.flagship.title}
            </h3>
          </div>
          <p className="text-slate-600 mt-6">{bento.flagship.body}</p>
        </div>
      </Reveal>

      <StatTile stat={bento.primaryStat} delay={0.05} />
      <StatTile stat={bento.secondaryStat} delay={0.1} />

      <Reveal direction="up" delay={0.1} className="col-span-2">
        <div className="glass-card glass-hover h-full p-6 md:p-7 min-h-[130px] flex flex-col justify-center">
          <h4 className="font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" /> {bento.highlight.title}
          </h4>
          <p className="text-sm text-slate-600 mt-2">{bento.highlight.body}</p>
        </div>
      </Reveal>

      <Reveal direction="up" delay={0.05} className="col-span-2">
        <div className="glass-card h-full p-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500 mb-3">Core toolkit</p>
          <div className="flex flex-wrap gap-2">
            {bento.tools.map((tool) => (
              <span
                key={tool}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 pill-glass text-sm text-slate-700"
              >
                <PillMark label={tool} />
                {tool}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal direction="up" delay={0.1} className="col-span-2">
        <div className="glass-card h-full p-6 flex flex-col justify-center">
          <Quote className="w-7 h-7 text-blue-500/70" />
          <p className="text-slate-700 mt-3 text-sm md:text-base leading-relaxed">{`“${shortQuote}”`}</p>
          <p className="mt-3 text-sm font-bold text-slate-900">
            {t.name} <span className="font-medium text-blue-600">· {t.role}</span>
          </p>
        </div>
      </Reveal>
    </div>
  );
}

/* ---------------- Before / After slider ---------------- */
function BaPanel({ side }: { side: 'before' | 'after' }) {
  const after = side === 'after';
  return (
    <div
      className={`absolute inset-0 ${
        after ? 'bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500' : 'bg-slate-200'
      }`}
    >
      <div className="absolute inset-0 flex flex-col justify-center gap-2.5 p-6 md:p-10">
        {beforeAfterStats.map((s) => (
          <div
            key={s.label}
            className={`flex items-baseline justify-between gap-4 pt-2.5 border-t first:border-0 ${
              after ? 'border-white/25' : 'border-slate-300'
            }`}
          >
            <span className={`text-sm ${after ? 'text-white/85' : 'text-slate-500'}`}>{s.label}</span>
            <span className={`text-xl md:text-2xl font-extrabold ${after ? 'text-white' : 'text-slate-600'}`}>
              {after ? s.after : s.before}
            </span>
          </div>
        ))}
      </div>
      <span
        className={`absolute top-4 text-xs font-bold uppercase tracking-[0.2em] ${
          after ? 'right-5 text-white/80' : 'left-5 text-slate-500'
        }`}
      >
        {after ? 'After' : 'Before'}
      </span>
    </div>
  );
}

export function BeforeAfterSlider() {
  const [pos, setPos] = useState(50);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = (clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) setFromClientX(e.clientX);
  };
  const stop = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 4));
    else if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 4));
    else if (e.key === 'Home') setPos(0);
    else if (e.key === 'End') setPos(100);
    else return;
    e.preventDefault();
  };

  return (
    <div>
      <div
        ref={frameRef}
        className="ba-frame relative h-[19rem] md:h-[21rem] rounded-3xl overflow-hidden premium-shadow border border-white/60"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stop}
        onPointerCancel={stop}
      >
        <BaPanel side="after" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <BaPanel side="before" />
        </div>
        <div className="ba-divider" style={{ left: `${pos}%` }}>
          <button
            type="button"
            className="ba-handle"
            role="slider"
            aria-label="Reveal before and after results"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            tabIndex={0}
            onKeyDown={onKeyDown}
          >
            <MoveHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
      <p className="text-center text-sm text-slate-500 mt-3">
        Drag the handle — or use the arrow keys — to compare before and after.
      </p>
    </div>
  );
}

/* ---------------- Projects lineup + lightbox ---------------- */
const GRADIENTS = [
  'from-indigo-500 via-blue-500 to-cyan-400',
  'from-fuchsia-500 via-purple-500 to-indigo-500',
  'from-amber-400 via-orange-500 to-rose-500',
];

function Lightbox({ block, gradient, onClose }: { block: SectionBlock; gradient: string; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const node = dialogRef.current;
    node?.focus();
    document.body.style.overflow = 'hidden';

    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && node) {
        const f = node.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])');
        if (f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prev?.focus?.();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={block.title}
        tabIndex={-1}
        initial={{ scale: 0.94, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 8, opacity: 0 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="relative w-full max-w-lg glass-card overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <div className={`relative h-44 bg-gradient-to-br ${gradient}`}>
          {block.image ? (
            <img src={block.image} alt={block.title} className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 dot-pattern opacity-30" />
          )}
          <div className={`absolute inset-0 bg-gradient-to-tr ${gradient} opacity-20 mix-blend-multiply`} />
          <span className="absolute top-4 left-5 px-3 py-1 rounded-full bg-slate-900/55 backdrop-blur text-xs font-bold uppercase tracking-wider text-white">
            {block.eyebrow}
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/25 backdrop-blur grid place-items-center text-white hover:bg-white/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 md:p-7">
          <h3 className="text-xl font-bold text-slate-900">{block.title}</h3>
          <p className="text-slate-600 mt-3">{block.body}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {block.items.map((it) => (
              <span
                key={it}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 pill-glass text-sm text-slate-700"
              >
                <PillMark label={it} />
                {it}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// A single project tile. Its own scroll progress drives a gentle Ken Burns
// drift on the photo (scrubbed scale + pan) that composes with the hover zoom.
function ProjectTile({ block, i, onOpen }: { block: SectionBlock; i: number; onOpen: (i: number) => void }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const kbScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.16, 1]);
  const kbY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-5%', '5%']);
  const grad = GRADIENTS[i % GRADIENTS.length];

  return (
    <Reveal direction={i % 2 ? 'right' : 'left'} delay={i * 0.05} className="h-full">
      <button
        type="button"
        onClick={() => onOpen(i)}
        className="group glass-card glass-hover overflow-hidden text-left w-full h-full flex flex-col"
      >
        <div ref={ref} className="relative h-44 overflow-hidden shrink-0">
          {block.image ? (
            <motion.div style={{ scale: kbScale, y: kbY }} className="absolute inset-0">
              <img
                src={block.image}
                alt={block.title}
                width={1200}
                height={800}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>
          ) : (
            <>
              <div className={`absolute inset-0 bg-gradient-to-br ${grad} transition-transform duration-700 group-hover:scale-110`} />
              <div className="absolute inset-0 dot-pattern opacity-30" />
            </>
          )}
          {/* subtle brand tint keeps the photos cohesive with the glass UI */}
          <div className={`absolute inset-0 bg-gradient-to-tr ${grad} opacity-20 mix-blend-multiply pointer-events-none`} />
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/55 backdrop-blur text-xs font-bold uppercase tracking-wider text-white">
            {block.eyebrow}
          </span>
          <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white">
              Explore <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-bold text-slate-900">{block.title}</h3>
          <p className="text-sm text-slate-600 mt-2 line-clamp-2">{block.body}</p>
        </div>
      </button>
    </Reveal>
  );
}

export function ProjectsLineup({ items }: { items: SectionBlock[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((block, i) => (
          <ProjectTile key={block.title} block={block} i={i} onOpen={setOpen} />
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <Lightbox
            block={items[open]}
            gradient={GRADIENTS[open % GRADIENTS.length]}
            onClose={() => setOpen(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------------- FAQ accordion ---------------- */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={f.q} delay={i * 0.04}>
            <div className="glass-card overflow-hidden">
              <button
                type="button"
                id={`faq-trigger-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 text-left p-5 md:p-6"
              >
                <span className="font-semibold text-slate-900">{f.q}</span>
                <Plus
                  className={`w-5 h-5 text-blue-600 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-45' : ''
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 md:px-6 pb-5 md:pb-6 text-slate-600">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
