/* ------------------------------------------------------------------ *
 * RESUME MODAL — a view-only resume. Visitors who just want to read it
 * see the full resume rendered in-page (an isolated iframe of the same
 * print HTML); a "Download PDF" action is offered but never forced.
 * Focus-trapped, ESC to close, scroll-locked behind it.
 * ------------------------------------------------------------------ */

import { useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, X } from 'lucide-react';
import { buildResumeHtml, downloadResume } from '../data/resume';

export function ResumeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const html = useMemo(() => (open ? buildResumeHtml(true) : ''), [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const node = dialogRef.current;
    document.body.style.overflow = 'hidden';
    node?.focus();

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
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-slate-900/55 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Resume preview"
            tabIndex={-1}
            initial={{ scale: 0.96, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-3xl h-[92vh] glass-card !rounded-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between gap-3 px-4 md:px-5 py-3 border-b border-white/50">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" /> Resume
              </h3>
              <div className="flex items-center gap-2">
                <button onClick={downloadResume} className="glass-btn !px-4 !py-2 text-sm">
                  <Download className="w-4 h-4" /> Download PDF
                </button>
                <button
                  onClick={onClose}
                  aria-label="Close resume"
                  className="w-9 h-9 rounded-full bg-white/60 hover:bg-white/80 grid place-items-center text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <iframe title="Resume preview" srcDoc={html} className="w-full flex-1 bg-white border-0" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
