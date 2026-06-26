/* ------------------------------------------------------------------ *
 * CURSOR GLOW — a soft gradient glow that trails the cursor smoothly
 * via a spring. Hidden on touch devices and under reduced-motion (CSS).
 * ------------------------------------------------------------------ */

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CursorGlow() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 350, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 350, damping: 22, mass: 0.4 });

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  return (
    <motion.div className="cursor-glow-wrap" style={{ x: sx, y: sy }} aria-hidden>
      <div className="cursor-glow" />
    </motion.div>
  );
}
