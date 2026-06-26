/* ------------------------------------------------------------------ *
 * PAGE CHROME — the traveling scroll marker (a gradient spine whose
 * fill tracks scroll progress and whose dots light up section by
 * section) and the slim "Open to freelance & projects" CTA bar that slides up
 * after the hero and tucks away near the footer.
 * ------------------------------------------------------------------ */

import { useEffect, useState } from 'react';
import type { MotionValue } from 'framer-motion';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SiWhatsapp } from '@icons-pack/react-simple-icons';

const EASE = [0.22, 1, 0.36, 1] as const;

export interface SpineSection {
  id: string;
  label: string;
}

/** Fixed vertical gradient spine: the fill grows with scroll progress and
 *  each dot marks (and jumps to) a section, lighting up when it is active. */
export function ScrollSpine({
  sections,
  active,
  progress,
  onJump,
}: {
  sections: SpineSection[];
  active: string;
  progress: MotionValue<number>;
  onJump: (id: string) => void;
}) {
  return (
    <div className="scroll-spine" aria-hidden={false}>
      <div className="spine-rail">
        <motion.div className="spine-fill" style={{ scaleY: progress }} />
      </div>
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onJump(s.id)}
            className="spine-dot group"
            data-active={isActive}
            aria-label={`Go to ${s.label}`}
            aria-current={isActive ? 'true' : undefined}
          >
            <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-slate-900/90 px-2.5 py-1 text-xs font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {s.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/** Non-blocking CTA bar — appears once the hero is scrolled past and retires
 *  for good once the visitor reaches the contact section, so it never overlaps
 *  the form (its whole job is to drive them there) or the closing content. */
export function AvailabilityBar({ onContact }: { onContact: () => void }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const contact = document.getElementById('contact');
    let retired = false;

    const update = () => {
      if (retired) { setShow(false); return; }
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setShow(y > window.innerHeight * 0.9 && y < max - 160);
    };

    const io = contact
      ? new IntersectionObserver(([e]) => {
          if (e.isIntersecting) { retired = true; setShow(false); }
        }, { threshold: 0.12 })
      : null;
    if (contact && io) io.observe(contact);

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      io?.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 pr-20 sm:pr-4 pointer-events-none"
        >
          <div className="pointer-events-auto glass-card !rounded-full flex items-center gap-3 py-2 pl-4 pr-2 premium-shadow-lg">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Open to freelance &amp; projects
            </span>
            <button onClick={onContact} className="glass-btn !px-4 !py-2 text-sm">
              Get in touch <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Floating WhatsApp button — gently bobs and pulses, opening a pre-filled
 *  chat. Sits bottom-right, clear of the centred availability bar and the
 *  scroll spine. All motion is disabled under prefers-reduced-motion. */
export function WhatsAppFab({ phone, message }: { phone: string; message: string }) {
  const reduce = useReducedMotion();
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-5 right-5 md:bottom-6 md:right-6 z-40"
      animate={reduce ? undefined : { y: [0, -9, 0] }}
      transition={reduce ? undefined : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      whileTap={{ scale: 0.92 }}
    >
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white ring-4 ring-white/40 shadow-[0_14px_34px_-8px_rgba(37,211,102,0.65)] transition-transform duration-300 group-hover:scale-110">
        {!reduce && <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping" />}
        <SiWhatsapp className="relative h-7 w-7" />
      </span>
      <span className="pointer-events-none absolute right-[4.2rem] top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-lg bg-slate-900/90 px-3 py-1.5 text-sm font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 md:block">
        Chat on WhatsApp
      </span>
    </motion.a>
  );
}
