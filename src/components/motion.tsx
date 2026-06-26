/* ------------------------------------------------------------------ *
 * MOTION PRIMITIVES — the reusable scroll-animation system every new
 * section builds on. All three honour prefers-reduced-motion: reveals
 * collapse to a plain opacity fade, the counter shows its final value
 * instantly and the magnetic pull is disabled entirely.
 * ------------------------------------------------------------------ */

import { Fragment, useEffect, useRef, useState } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { motion, animate, useInView, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

// DTU (up) · UTD (down) · LTR (left) · RTL (right) — the offsets each
// reveal travels from before settling into place.
const OFFSETS: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 26 },
  down: { x: 0, y: -26 },
  left: { x: -40, y: 0 },
  right: { x: 40, y: 0 },
  none: { x: 0, y: 0 },
};

const EASE = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  scale?: boolean;
  delay?: number;
  amount?: number;
  className?: string;
}

/** Fade + directional slide as the element scrolls into view (once). */
export function Reveal({
  children,
  direction = 'up',
  scale = false,
  delay = 0,
  amount = 0.2,
  className,
}: RevealProps) {
  const reduce = useReducedMotion();
  const off = OFFSETS[direction];

  const hidden = reduce
    ? { opacity: 0 }
    : { opacity: 0, x: off.x, y: off.y, scale: scale ? 0.96 : 1 };
  const show = reduce ? { opacity: 1 } : { opacity: 1, x: 0, y: 0, scale: 1 };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden, show }}
      transition={{ duration: reduce ? 0.3 : 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Animates the numeric part of a label (e.g. "2,000+", "+690% growth")
 *  from zero to its value on scroll-in, preserving prefix/suffix/commas. */
export function CountUp({
  value,
  className,
  duration = 1.4,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const match = value.match(/\d[\d,]*(?:\.\d+)?/);
  const idx = match?.index ?? 0;
  const target = match ? parseFloat(match[0].replace(/,/g, '')) : 0;
  const decimals = match && match[0].includes('.') ? match[0].split('.')[1].length : 0;
  const prefix = match ? value.slice(0, idx) : value;
  const suffix = match ? value.slice(idx + match[0].length) : '';
  const fmt = (n: number) =>
    n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  const [text, setText] = useState(() => (!match || reduce ? value : prefix + fmt(0) + suffix));

  useEffect(() => {
    if (!match || reduce) {
      setText(value);
      return;
    }
    if (!inView) return;
    const controls = animate(0, target, {
      duration,
      ease: EASE,
      onUpdate: (v) => setText(prefix + fmt(v) + suffix),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}

/** A gradient heading that wipes in left→right and eases up + scales from its
 *  left edge, all scrubbed to scroll as it enters view (keeps the gradient
 *  continuous — no per-word seams). */
export function RevealHeading({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.45'] });
  const right = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [100, 0]);
  const clipPath = useTransform(right, (v) => `inset(0 ${v}% 0 0)`);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.94, 1]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [16, 0]);

  return (
    <motion.h2 ref={ref} style={{ clipPath, scale, y, transformOrigin: 'left' }} className={className}>
      {children}
    </motion.h2>
  );
}

/** Word-by-word reveal — each word eases up and unblurs in a gentle stagger as
 *  the line scrolls into view. The premium "type settles into place" feel.
 *  Reduced-motion collapses to a single soft fade. */
export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.05,
  amount = 0.4,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  amount?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <motion.p
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount }}
        transition={{ duration: 0.4 }}
      >
        {text}
      </motion.p>
    );
  }

  const words = text.split(' ');
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const word = {
    hidden: { y: 18, opacity: 0, filter: 'blur(6px)' },
    show: { y: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.55, ease: EASE } },
  };

  return (
    <motion.p
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <motion.span variants={word} className="inline-block">
            {w}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </motion.p>
  );
}

/** Letter-by-letter reveal — each character lifts up, unblurs and scales into
 *  place in a quick cascade. `trigger='mount'` plays immediately (for above-the-
 *  fold headlines like the hero name); `'inView'` waits until it scrolls in.
 *  Reduced-motion collapses to a single fade. */
export function LetterReveal({
  text,
  className,
  letterClassName,
  trigger = 'inView',
  delay = 0,
  stagger = 0.045,
}: {
  text: string;
  className?: string;
  letterClassName?: string;
  trigger?: 'mount' | 'inView';
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  const chars = Array.from(text);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const letter = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { y: '0.45em', opacity: 0, filter: 'blur(8px)', scale: 0.85 },
        show: { y: 0, opacity: 1, filter: 'blur(0px)', scale: 1, transition: { duration: 0.5, ease: EASE } },
      };

  const inner = chars.map((c, i) =>
    c === ' ' ? (
      <span key={`sp-${i}`}> </span>
    ) : (
      <motion.span key={`${c}-${i}`} variants={letter} className={letterClassName} style={{ display: 'inline-block' }}>
        {c}
      </motion.span>
    )
  );

  if (trigger === 'mount') {
    return (
      <motion.span variants={container} initial="hidden" animate="show" className={className} style={{ display: 'inline-block' }}>
        {inner}
      </motion.span>
    );
  }
  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      className={className}
      style={{ display: 'inline-block' }}
    >
      {inner}
    </motion.span>
  );
}

/** Scroll-scrubbed zoom — scales (and softly fades) its content from `from`→`to`
 *  as the block crosses the viewport. Reversible and tied to the scrollbar, so
 *  it reads as one continuous cinematic push rather than a one-shot trigger. */
export function ScrollZoom({
  children,
  className,
  from = 0.88,
  to = 1,
  fade = true,
}: {
  children: ReactNode;
  className?: string;
  from?: number;
  to?: number;
  fade?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'center 0.6'] });
  const scaleRaw = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [from, to]);
  const scale = useSpring(scaleRaw, { stiffness: 140, damping: 30, mass: 0.4 });
  const opacity = useTransform(scrollYProgress, [0, 1], fade && !reduce ? [0.5, 1] : [1, 1]);

  return (
    <motion.div ref={ref} style={{ scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

/** Subtle spring pull toward the cursor with press feedback — used on
 *  primary CTAs. Disabled under reduced-motion. */
export function Magnetic({
  children,
  className,
  strength = 0.3,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });

  if (reduce) return <span className={className}>{children}</span>;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: 'inline-flex' }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.div>
  );
}
