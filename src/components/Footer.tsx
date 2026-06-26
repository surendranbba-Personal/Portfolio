import { ArrowUp, Download, Mail } from 'lucide-react';
import { profile, currentYear } from '../data/content';
import { navigate } from '../lib/router';

export function Footer({ onBackToTop }: { onBackToTop?: () => void }) {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-300">
      <div className="absolute -top-px left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-cyan-400 to-fuchsia-500" />
      <div className="blob w-72 h-72 bg-indigo-600/30 -top-20 -left-10 float-slow" />
      <div className="blob w-72 h-72 bg-fuchsia-600/20 -bottom-24 right-0 float" />

      <div className="relative max-w-6xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/favicon.png"
                alt="Brand favicon"
                className="h-12 w-12 rounded-2xl bg-white/10 p-2 object-contain shadow-lg ring-2 ring-white/20"
              />
              <div>
                <p className="font-display font-bold text-white text-lg leading-tight">{profile.name}</p>
                <p className="text-xs text-slate-400">{profile.title}</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-xs">{profile.tagline} · Based in {profile.location}.</p>
            <div className="flex flex-col gap-3 mt-5 sm:flex-row sm:items-center sm:gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="glass-btn inline-flex items-center gap-2 px-4 py-2 text-sm"
              >
                <Mail className="w-4 h-4" /> Email me
              </a>
              <a
                href="/visiting-card.jpg"
                download="visiting-card.jpg"
                className="glass-btn inline-flex items-center gap-2 px-4 py-2 text-sm"
              >
                <Download className="w-4 h-4" /> Download visiting card
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick links</h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
              <button onClick={() => navigate('/')} className="text-left text-slate-400 hover:text-white transition-colors">
                Portfolio
              </button>
              <button onClick={() => navigate('/blog')} className="text-left text-slate-400 hover:text-white transition-colors">
                Blog
              </button>
              <button onClick={() => navigate('/pricing')} className="text-left text-slate-400 hover:text-white transition-colors">
                Pricing
              </button>
              <button
                onClick={() => {
                  const contactElement = document.getElementById('contact-form');
                  if (contactElement) contactElement.scrollIntoView({ behavior: 'smooth' });
                  else navigate('/');
                }}
                className="text-left text-slate-400 hover:text-white transition-colors"
              >
                Contact
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Let's connect</h4>
            <p className="text-sm text-slate-400 mb-4">
              Available for freelance and project-based work. Reach out to discuss your Shopify, SEO or growth project.
            </p>
            <button
              onClick={() => (onBackToTop ? onBackToTop() : window.scrollTo({ top: 0, behavior: 'smooth' }))}
              className="glass-btn inline-flex items-center gap-2 !px-4 !py-2 text-sm"
            >
              <ArrowUp className="w-4 h-4" /> Back to top
            </button>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} {profile.name}. All rights reserved.</p>
          <p>Designed for digital-first Shopify and marketing experiences.</p>
        </div>
      </div>
    </footer>
  );
}
