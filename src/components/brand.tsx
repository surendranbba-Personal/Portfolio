/* ------------------------------------------------------------------ *
 * BRAND MARKS — the shared pill leading-mark (official logo when a tool
 * is recognised, else a matching lucide icon) and the auto-scrolling
 * "tools I work with" marquee. Keeping the brand-logo lookup here means
 * the skills pills, bento tools tile and marquee all stay in sync.
 * ------------------------------------------------------------------ */

import type { LucideIcon } from 'lucide-react';
import { motion, useScroll, useVelocity, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import {
  Search, MousePointer, Users, BarChart3, Globe, CheckCircle, Zap,
  Sparkles, Layers, FileText, Target, Palette, Tag,
} from 'lucide-react';
import {
  SiGoogleads, SiMeta, SiGoogleanalytics, SiGooglesearchconsole,
  SiShopify, SiSupabase, SiClaude,
} from '@icons-pack/react-simple-icons';

// Official brand logos, matched by keyword so ANY label that mentions a known
// tool shows its logo. First keyword found in the label wins.
const BRAND_LOGOS: ReadonlyArray<readonly [string, typeof SiShopify]> = [
  ['Google Ads', SiGoogleads],
  ['Google Analytics', SiGoogleanalytics],
  ['Search Console', SiGooglesearchconsole],
  ['Meta Ads', SiMeta],
  ['Shopify', SiShopify],
  ['Supabase', SiSupabase],
  ['Claude', SiClaude],
];

const logoFor = (label: string) => BRAND_LOGOS.find(([key]) => label.includes(key))?.[1];

// Lucide fallback icons for labels with no brand logo (first match wins);
// anything unmatched falls back to a neutral Sparkles mark.
const FALLBACK_ICONS: ReadonlyArray<readonly [string, LucideIcon]> = [
  ['Canva', Palette],
  ['Office', FileText],
  ['Keyword', Tag],
  ['Metadata', Tag],
  ['Content', FileText],
  ['SEO', Search],
  ['Search', Search],
  ['Analytics', BarChart3],
  ['Report', BarChart3],
  ['Dashboard', BarChart3],
  ['Data', BarChart3],
  ['Measurement', BarChart3],
  ['CRO', Target],
  ['Conversion', Target],
  ['ROI', Target],
  ['Priority', Target],
  ['Ads', MousePointer],
  ['Campaign', MousePointer],
  ['Budget', MousePointer],
  ['Audience', Users],
  ['Social', Users],
  ['Lead', Users],
  ['CRM', Users],
  ['Enquiry', Users],
  ['Workflow', Zap],
  ['Automation', Zap],
  ['Speed', Zap],
  ['Performance', Zap],
  ['Fast', Zap],
  ['Landing', Globe],
  ['Web', Globe],
  ['UI/UX', Globe],
  ['Navigation', Globe],
  ['Mobile', Globe],
  ['Responsive', Globe],
  ['Product', Globe],
  ['Store', Globe],
  ['Page', Globe],
  ['Channel', Layers],
  ['Roadmap', Layers],
  ['Structure', Layers],
  ['Offer', Layers],
  ['Trust', CheckCircle],
];

const fallbackIcon = (label: string): LucideIcon =>
  FALLBACK_ICONS.find(([key]) => label.includes(key))?.[1] ?? Sparkles;

/** A pill's leading mark: brand logo (in brand colour) when one exists,
 *  otherwise a matching lucide icon in a muted tone so logos still pop. */
export function PillMark({ label }: { label: string }) {
  const Logo = logoFor(label);
  if (Logo) return <Logo size={14} color="default" className="shrink-0" />;
  const Icon = fallbackIcon(label);
  return <Icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />;
}

// The core toolset, shown gliding across the marquee band.
const TOOLS: ReadonlyArray<readonly [string, typeof SiShopify]> = [
  ['Google Ads', SiGoogleads],
  ['Meta Ads', SiMeta],
  ['Shopify', SiShopify],
  ['Google Analytics', SiGoogleanalytics],
  ['Search Console', SiGooglesearchconsole],
  ['Supabase', SiSupabase],
  ['Claude AI', SiClaude],
];

/** Slim, seamless auto-scrolling band of the tools I work with. Two identical
 *  tracks loop via CSS; hovering pauses. The whole band also leans slightly
 *  with scroll velocity — faster scrolling skews it more — and reduced-motion
 *  stops both. */
export function LogoMarquee() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const skewRaw = useTransform(velocity, [-2000, 0, 2000], [6, 0, -6]);
  const skewX = useSpring(skewRaw, { stiffness: 200, damping: 30, mass: 0.5 });
  const track = [...TOOLS, ...TOOLS];

  return (
    <motion.div className="marquee-mask overflow-hidden" style={reduce ? undefined : { skewX }}>
      <div className="marquee gap-4 py-1">
        {track.map(([name, Logo], i) => (
          <span
            key={`${name}-${i}`}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 pill-glass text-slate-700 font-semibold whitespace-nowrap"
          >
            <Logo size={20} color="default" />
            {name}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
