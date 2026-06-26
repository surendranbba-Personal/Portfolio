/* ------------------------------------------------------------------ *
 * ATMOSPHERE — the realism layer. A subtle film-grain + vignette over
 * everything (so the page reads photographed, not rendered), and a
 * scroll-driven bright mood background whose colour gently shifts from
 * indigo → cyan → violet → amber as you move down the page.
 * ------------------------------------------------------------------ */

import { motion, useScroll, useTransform } from 'framer-motion';

/** Fixed film-grain + vignette overlays (CSS-animated, non-interactive). */
export function Grain() {
  return (
    <>
      <div className="grain" aria-hidden />
      <div className="vignette" aria-hidden />
    </>
  );
}

/** Four bright gradient layers that cross-fade with scroll progress. */
export function MoodBackground() {
  const { scrollYProgress } = useScroll();
  const o0 = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const o1 = useTransform(scrollYProgress, [0.15, 0.35, 0.55], [0, 1, 0]);
  const o2 = useTransform(scrollYProgress, [0.45, 0.65, 0.85], [0, 1, 0]);
  const o3 = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  return (
    <div className="mood-bg" aria-hidden>
      <motion.div className="mood-layer m0" style={{ opacity: o0 }} />
      <motion.div className="mood-layer m1" style={{ opacity: o1 }} />
      <motion.div className="mood-layer m2" style={{ opacity: o2 }} />
      <motion.div className="mood-layer m3" style={{ opacity: o3 }} />
    </div>
  );
}
