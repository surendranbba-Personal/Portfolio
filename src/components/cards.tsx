/* ------------------------------------------------------------------ *
 * SHARED CARDS — the small building blocks reused across page sections:
 * the section Eyebrow label, the experience/project TimelineCard and the
 * icon + body + pills RichBlockCard. Kept here so every section composes
 * from the same pieces.
 * ------------------------------------------------------------------ */

import type { LucideIcon } from 'lucide-react';
import { Calendar, CheckCircle, FileText } from 'lucide-react';
import { Reveal, CountUp } from './motion';
import { PillMark } from './brand';
import { dateRange, fmtDuration, roleMonths } from '../data/content';
import type { Role } from '../data/content';

/** Eyebrow label shown above every section heading. */
export function Eyebrow({ icon: Icon, children }: { icon: LucideIcon; children: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full pill-glass text-blue-600 text-sm font-semibold">
      <Icon className="w-4 h-4" /> {children}
    </span>
  );
}

/** Experience + project timeline card. On desktop the photo becomes a
 *  full-height side column whose side alternates with the reveal direction
 *  for an editorial rhythm; on mobile it is a top banner that fades in. */
export function TimelineCard({ role, direction = 'up' }: { role: Role; direction?: 'up' | 'left' | 'right' }) {
  const imageRight = direction === 'right';
  return (
    <Reveal direction={direction} className="h-full">
      <div className={`group glass-card glass-hover relative overflow-hidden h-full md:flex ${imageRight ? 'md:flex-row-reverse' : ''}`}>
        {role.image && (
          <div className="relative md:w-[38%] md:shrink-0 h-44 sm:h-52 md:h-auto overflow-hidden">
            <img
              src={role.image}
              alt={`${role.org} — ${role.title}`}
              width={1200}
              height={800}
              loading="lazy"
              className="w-full h-full min-h-44 object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/25 via-blue-500/10 to-cyan-400/10 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/5 to-transparent md:from-transparent md:via-transparent" />
          </div>
        )}
        <div className="relative flex-1 p-6 md:p-8">
          <span className={`absolute top-0 h-full w-1.5 bg-gradient-to-b from-indigo-500 via-blue-500 to-cyan-400 ${imageRight ? 'right-0' : 'left-0'}`} />
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
            <div>
              <h3 className="text-xl font-bold text-slate-900">{role.org}</h3>
              <p className="text-blue-600 font-semibold">{role.title}</p>
            </div>
            <div className="md:text-right shrink-0">
              <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600">
                <Calendar className="w-4 h-4" />
                {dateRange(role.start, role.end)}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {fmtDuration(roleMonths(role))}
                {!role.end && ' · Ongoing'}
              </p>
            </div>
          </div>

          <ul className="mt-5 space-y-2.5">
            {role.points.map((point) => (
              <li key={point} className="flex gap-3 text-slate-600">
                <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {role.stats && (
            <div className="mt-6 pt-5 border-t border-white/60 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {role.stats.map((st) => (
                <div key={st.label} className="rounded-xl bg-white/60 p-3 text-center">
                  <p className="text-lg font-extrabold text-gradient leading-tight">
                    <CountUp value={st.value} />
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">{st.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}

/** Icon + eyebrow + title + body + pill list — used by Results, Skills
 *  and Process for their richer informational blocks. */
export function RichBlockCard({
  block,
  icon: Icon = FileText,
  direction = 'up',
  delay = 0,
}: {
  block: { eyebrow: string; title: string; body: string; items: string[] };
  icon?: LucideIcon;
  direction?: 'up' | 'left' | 'right';
  delay?: number;
}) {
  return (
    <Reveal direction={direction} delay={delay} className="h-full">
      <div className="glass-card glass-hover p-6 md:p-7 h-full">
        <div className="flex items-start gap-4">
          <span className="w-12 h-12 rounded-xl bg-white/70 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-blue-600" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500">{block.eyebrow}</p>
            <h3 className="text-xl font-bold text-slate-900 mt-1">{block.title}</h3>
          </div>
        </div>
        <p className="text-slate-600 mt-5">{block.body}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {block.items.map((item) => (
            <span key={item} className="inline-flex items-center gap-1.5 px-3 py-1.5 pill-glass text-sm text-slate-700">
              <PillMark label={item} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
