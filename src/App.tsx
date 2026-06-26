import { useState, useEffect, useRef } from 'react';
import type { RefObject, ComponentType } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  Mail, Phone, MapPin, Linkedin, ChevronDown, Calendar,
  Award, TrendingUp, Users, BarChart3, Search, MousePointer,
  Globe, Menu, X, CheckCircle, Briefcase, GraduationCap,
  Languages, Sparkles, ArrowRight, Download, Zap, ArrowUp,
  LineChart as LineChartIcon, Target, Layers, Quote, Star, HelpCircle, Eye, MoveHorizontal, BookOpen,
} from 'lucide-react';
import { SiInstagram, SiFacebook } from '@icons-pack/react-simple-icons';
import {
  profile, experiences, projects, keyAchievements, skillGroups, totalSkills,
  education, certifications, languages,
  totalExperience, currentYear, growthHeadline, growthIntro, growthMetrics,
  growthSeries, growthDrivers, focusAreas, workflowSteps, resultStory,
  projectDeepDives, skillDetails, testimonials, beforeAfterStats,
} from './data/content';
import { downloadResume } from './data/resume';
import LineChart from './components/LineChart';
import { Reveal, CountUp, Magnetic, RevealHeading, WordReveal, ScrollZoom, LetterReveal } from './components/motion';
import { PillMark, LogoMarquee } from './components/brand';
import { ScrollSpine, AvailabilityBar, WhatsAppFab } from './components/chrome';
import type { SpineSection } from './components/chrome';
import { StatementBand, BentoGrid, BeforeAfterSlider, ProjectsLineup, Faq } from './components/sections';
import { Grain, MoodBackground } from './components/atmosphere';
import { ResumeModal } from './components/ResumeModal';
import { CursorGlow } from './components/CursorGlow';
import { Footer } from './components/Footer';
import { ContactForm } from './components/ContactForm';
import { Eyebrow, TimelineCard, RichBlockCard } from './components/cards';
import { BlogCard } from './components/blog';
import { blogPosts } from './data/blog';
import { navigate } from './lib/router';

const groupStyle: Record<string, { icon: LucideIcon; text: string; bg: string }> = {
  'SEO & Content': { icon: Search, text: 'text-indigo-600', bg: 'bg-indigo-50' },
  'Paid Advertising': { icon: MousePointer, text: 'text-fuchsia-600', bg: 'bg-fuchsia-50' },
  'Analytics & CRO': { icon: TrendingUp, text: 'text-emerald-600', bg: 'bg-emerald-50' },
  'E-commerce & Web': { icon: Globe, text: 'text-cyan-600', bg: 'bg-cyan-50' },
  'Social & Brand': { icon: Users, text: 'text-amber-600', bg: 'bg-amber-50' },
  'Tools & AI': { icon: Sparkles, text: 'text-violet-600', bg: 'bg-violet-50' },
};

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const expRef = useRef<HTMLElement>(null);
  const resultsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const educationRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Hero parallax — the portrait and the background pattern drift at
  // different speeds for depth (disabled under reduced-motion).
  const { scrollYProgress: heroProgress } = useScroll({ target: homeRef, offset: ['start start', 'end start'] });
  const photoY = useTransform(heroProgress, [0, 1], [0, reduce ? 0 : -70]);
  const patternY = useTransform(heroProgress, [0, 1], [0, reduce ? 0 : 60]);
  const statY = useTransform(heroProgress, [0, 1], [0, reduce ? 0 : -36]);
  const photoScale = useTransform(heroProgress, [0, 1], [1, reduce ? 1 : 1.12]);

  const scrollTo = (ref: RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Subtle elevation on the navbar once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const nav: [string, RefObject<HTMLElement>][] = [
    ['About', aboutRef],
    ['Experience', expRef],
    ['Results', resultsRef],
    ['Projects', projectsRef],
    ['Skills', skillsRef],
    ['Process', processRef],
    ['Education', educationRef],
    ['Reviews', testimonialsRef],
    ['Contact', contactRef],
  ];

  // Sections marked on the traveling scroll spine (jump-to dots).
  const spineSections: SpineSection[] = [
    { id: 'home', label: 'Home' },
    ...nav.map(([name]): SpineSection => ({ id: name.toLowerCase(), label: name })),
  ];
  const jumpTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const socialLinks: {
    label: string;
    href: string;
    icon: ComponentType<{ className?: string }>;
    action: string;
    tint: string;
  }[] = [
    { label: 'LinkedIn', href: profile.linkedin, icon: Linkedin, action: 'Connect with me', tint: 'text-[#0A66C2]' },
    { label: 'Instagram', href: profile.instagram, icon: SiInstagram, action: 'Follow me', tint: 'text-[#E4405F]' },
    { label: 'Facebook', href: profile.facebook, icon: SiFacebook, action: 'Follow me', tint: 'text-[#1877F2]' },
  ];

  const heroStats: { value: string; label: string; count: boolean }[] = [
    { value: totalExperience, label: 'Experience', count: false },
    { value: String(experiences.length + projects.length), label: 'Roles & Projects', count: true },
    { value: String(totalSkills), label: 'Core Skills', count: true },
  ];

  return (
    <div className="relative">
      <CursorGlow />
      <Grain />
      <MoodBackground />
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />

      {/* colourful animated background */}
      <div className="app-bg">
        <div className="blob w-80 h-80 bg-indigo-300 top-10 -left-10 float-slow" />
        <div className="blob w-72 h-72 bg-cyan-300 top-1/3 right-0 float" />
        <div className="blob w-80 h-80 bg-fuchsia-300 bottom-20 left-1/4 float-slow" />
        <div className="blob w-64 h-64 bg-amber-200 bottom-0 right-1/4 float" />
      </div>

      {/* scroll progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 origin-left z-[60] gradient-primary"
        style={{ scaleX: progress }}
      />

      {/* traveling scroll marker + sticky CTA */}
      <ScrollSpine sections={spineSections} active={activeSection} progress={progress} onJump={jumpTo} />
      <AvailabilityBar onContact={() => scrollTo(contactRef)} />
      <WhatsAppFab
        phone={profile.phone.replace(/\D/g, '')}
        message={`Hi ${profile.name.split(' ')[0]}, I came across your portfolio — I'd like to discuss a freelance project / collaboration.`}
      />

      {/* ---------------- NAVBAR ---------------- */}
      <nav className={`fixed w-full z-50 glass-nav transition-shadow duration-300 ${scrolled ? 'shadow-[0_10px_30px_-12px_rgba(2,6,23,0.18)]' : ''}`}>
        <div className={`max-w-7xl mx-auto flex justify-between items-center gap-4 px-4 transition-all duration-300 ${scrolled ? 'py-2.5' : 'py-4'}`}>
          <button onClick={() => scrollTo(homeRef)} className="flex items-center gap-2.5 group shrink-0">
            <img src="/favicon.png" alt="Brand favicon" className="h-7 w-7 object-contain" />
            <span className="font-display font-bold text-xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors whitespace-nowrap">
              {profile.name}
            </span>
          </button>

          <div className="hidden xl:flex items-center gap-5">
            {nav.map(([name, ref]) => {
              const active = activeSection === name.toLowerCase();
              return (
                <button
                  key={name}
                  onClick={() => scrollTo(ref)}
                  className={`relative px-1 transition-colors ${active ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  {name}
                  {active && <motion.span layoutId="nav-underline" className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full gradient-primary" />}
                </button>
              );
            })}
            <button
              onClick={() => navigate('/blog')}
              className="relative px-1 text-slate-600 transition-colors hover:text-slate-900"
            >
              Blog
            </button>
            <button onClick={() => setResumeOpen(true)} className="glass-btn !px-5 !py-2.5 text-sm">
              <Eye className="w-4 h-4" /> Resume
            </button>
          </div>

          <button className="xl:hidden text-slate-700" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="xl:hidden overflow-hidden glass-nav border-t border-white/40"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {nav.map(([name, ref]) => {
                  const active = activeSection === name.toLowerCase();
                  return (
                    <button
                      key={name}
                      onClick={() => scrollTo(ref)}
                      className={`text-left px-3 py-2.5 rounded-xl transition-colors ${active ? 'bg-white/60 text-blue-600 font-semibold' : 'text-slate-700 hover:bg-white/50'}`}
                    >
                      {name}
                    </button>
                  );
                })}
                <button
                  onClick={() => { setMenuOpen(false); navigate('/blog'); }}
                  className="text-left px-3 py-2.5 rounded-xl text-slate-700 transition-colors hover:bg-white/50"
                >
                  Blog
                </button>
                <button
                  onClick={() => { setMenuOpen(false); setResumeOpen(true); }}
                  className="glass-btn w-full justify-center mt-2"
                >
                  <Eye className="w-4 h-4" /> View Resume
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ---------------- HERO ---------------- */}
      <section ref={homeRef} id="home" className="relative pt-28 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        <motion.div style={{ y: patternY }} className="absolute -inset-y-24 inset-x-0 dot-pattern opacity-50" />

        <div className="relative max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* LEFT — intro */}
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <img
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                className="lg:hidden w-28 h-28 rounded-full object-cover mx-auto mb-5 premium-shadow-lg ring-4 ring-white/60"
              />

              <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full pill-glass text-blue-600 text-xs sm:text-sm font-medium mb-5 whitespace-nowrap max-w-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" /> {profile.status}
              </span>
              <h1 className="text-fluid-hero font-extrabold font-display">
                <LetterReveal
                  text={profile.name}
                  trigger="mount"
                  delay={0.15}
                  stagger={0.05}
                  letterClassName="text-gradient animate-gradient"
                />
              </h1>
              <p className="text-xl md:text-2xl text-blue-600 font-semibold mt-3">{profile.title}</p>
              <p className="mt-2 text-xs md:text-sm uppercase tracking-[0.25em] text-slate-600">{profile.tagline}</p>
              <WordReveal
                className="mt-5 max-w-xl mx-auto lg:mx-0 text-slate-600 text-lg"
                text="I help ambitious brands flourish — shaping search visibility, performance-driven advertising and refined digital experiences with precision, clarity and craft."
              />

              <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
                <Magnetic>
                  <button onClick={() => scrollTo(contactRef)} className="glass-btn">
                    Start a Conversation <ArrowRight className="w-4 h-4" />
                  </button>
                </Magnetic>
                <Magnetic>
                  <button onClick={() => scrollTo(resultsRef)} className="glass-btn-ghost">
                    <BarChart3 className="w-4 h-4" /> View My Work
                  </button>
                </Magnetic>
              </div>

              {/* auto-derived stats */}
              <motion.div style={{ y: statY }} className="mt-9 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
                {heroStats.map(({ value, label, count }) => (
                  <div key={label} className="glass-card glass-hover p-4">
                    <p className="text-lg md:text-2xl font-extrabold text-gradient">
                      {count ? <CountUp value={value} /> : value}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* RIGHT — portrait + floating data (desktop) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative hidden lg:block"
            >
              <div className="blob w-72 h-72 bg-cyan-300/40 -top-10 right-0 float" />

              <motion.div style={{ y: photoY, scale: photoScale }} className="relative mx-auto max-w-sm">
                <img
                  src={profile.photo}
                  alt={`Portrait of ${profile.name}`}
                  width={648}
                  height={864}
                  className="w-full rounded-[2rem] object-cover aspect-[3/4] premium-shadow-lg ring-4 ring-white/60"
                />

                <motion.div
                  className="absolute -top-4 -left-5 glass-card px-4 py-2.5 flex items-center gap-2"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-semibold text-slate-700">Open to freelance &amp; projects</span>
                </motion.div>

                <motion.div
                  className="absolute top-8 -right-5 glass-card px-4 py-3 flex items-center gap-2"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 }}
                >
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-semibold text-slate-700">+300% Traffic</span>
                </motion.div>

                <motion.div
                  className="absolute -bottom-8 -left-6 right-4 glass-card p-4"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <p className="text-[11px] uppercase tracking-wider text-slate-500 mb-2.5">
                    Supreme Computers · 6-month growth
                  </p>
                  <div className="space-y-2.5">
                    {growthMetrics.slice(0, 3).map((m, i) => {
                      const widths = ['92%', '88%', '96%'];
                      return (
                        <div key={m.title}>
                          <div className="flex justify-between items-baseline mb-1">
                            <span className="text-xs text-slate-600">{m.title}</span>
                            <span className="text-xs font-bold text-gradient">{m.value}</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-white/70 overflow-hidden">
                            <motion.div
                              className="h-full rounded-full gradient-primary"
                              initial={{ width: 0 }}
                              animate={{ width: widths[i] }}
                              transition={{ duration: 1, delay: 0.7 + i * 0.15, ease: 'easeOut' }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          <button
            onClick={() => scrollTo(aboutRef)}
            className="mt-12 lg:mt-16 text-slate-500 hover:text-blue-600 transition-colors mx-auto block"
            aria-label="Scroll to about"
          >
            <ChevronDown className="w-6 h-6 animate-bounce mx-auto" />
          </button>
        </div>
      </section>

      {/* ---------------- BENTO SNAPSHOT ---------------- */}
      <section id="bento" className="section-spacing pt-6 md:pt-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <Eyebrow icon={Sparkles}>At a glance</Eyebrow>
            <RevealHeading className="text-fluid-h2 font-bold font-display text-gradient">A snapshot of the work</RevealHeading>
          </div>
          <ScrollZoom from={0.93}>
            <BentoGrid />
          </ScrollZoom>
        </div>
      </section>

      {/* ---------------- ABOUT ---------------- */}
      <section ref={aboutRef} id="about" className="section-spacing">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <Eyebrow icon={Sparkles}>Introduction</Eyebrow>
            <RevealHeading className="text-fluid-h2 font-bold font-display text-gradient">Professional Summary</RevealHeading>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 items-stretch">
            <Reveal direction="left" className="lg:col-span-2 h-full">
              <div className="glass-card glass-hover p-8 md:p-10 flex flex-col justify-center h-full">
                <WordReveal className="text-slate-600 text-lg md:text-xl leading-relaxed" text={profile.summary} stagger={0.035} />

                <div className="mt-6 flex flex-wrap gap-2.5">
                  {['Lead Generation', 'Conversion Growth', 'AI-Powered Tools', 'Data-Driven'].map((t) => (
                    <span key={t} className="px-4 py-1.5 pill-glass text-sm text-blue-600 font-medium">{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.1} className="h-full">
              <div className="glass-card glass-hover p-8 flex flex-col justify-center gap-5 h-full">
                {[
                  [Briefcase, 'Experience', totalExperience],
                  [CheckCircle, 'Availability', profile.availability],
                  [MapPin, 'Location', profile.location],
                  [GraduationCap, 'Education', 'MBA · Marketing'],
                ].map(([Icon, k, v]) => {
                  const I = Icon as LucideIcon;
                  return (
                    <div key={k as string} className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-white/70 flex items-center justify-center shrink-0">
                        <I className="w-5 h-5 text-blue-600" />
                      </span>
                      <div>
                        <p className="text-xs text-slate-500">{k as string}</p>
                        <p className="font-semibold text-slate-800">{v as string}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
            {focusAreas.map((area, i) => {
              const icons = [Search, MousePointer, Globe, BarChart3];
              const Icon = icons[i % icons.length];
              return (
                <Reveal key={area.title} direction="up" delay={i * 0.06} className="h-full">
                  <div className="glass-card glass-hover p-6 h-full">
                    <span className="w-11 h-11 rounded-xl bg-white/70 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </span>
                    <h3 className="font-bold text-slate-900">{area.title}</h3>
                    <p className="text-sm text-slate-600 mt-3">{area.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- STATEMENT BAND ---------------- */}
      <StatementBand />

      {/* ---------------- EXPERIENCE ---------------- */}
      <section ref={expRef} id="experience" className="section-spacing">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <Eyebrow icon={Briefcase}>Career</Eyebrow>
            <RevealHeading className="text-fluid-h2 font-bold font-display text-gradient">Professional Experience</RevealHeading>
          </div>
          <div className="space-y-6">
            {experiences.map((role, i) => (
              <TimelineCard key={role.org} role={role} direction={i % 2 ? 'right' : 'left'} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- RESULTS / STICKY GROWTH STORY ---------------- */}
      <section ref={resultsRef} id="results" className="section-spacing">
        <div className="max-w-6xl mx-auto px-4">
          <Reveal className="block mb-10 md:mb-12">
            <ScrollZoom from={0.95} fade={false}>
              <div className="group relative h-48 md:h-72 rounded-3xl overflow-hidden premium-shadow border border-white/60">
                <img
                  src="/photos/results-analytics.jpg"
                  alt="Live web performance analytics — sessions, page load and bounce rate"
                  width={1200}
                  height={800}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-700/40 via-blue-600/15 to-transparent mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5 md:p-8">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-white text-xs font-semibold">
                    <LineChartIcon className="w-3.5 h-3.5" /> Measured in Analytics &amp; Search Console
                  </span>
                  <p className="text-white font-display font-bold text-xl md:text-3xl mt-3 max-w-md leading-tight">
                    Six focused months of compounding, measurable growth.
                  </p>
                </div>
              </div>
            </ScrollZoom>
          </Reveal>

          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14">
            {/* LEFT — pinned headline + metric stack */}
            <div className="lg:sticky lg:top-24 self-start">
              <Eyebrow icon={LineChartIcon}>Results</Eyebrow>
              <RevealHeading className="text-fluid-h2 font-bold font-display text-gradient">{growthHeadline}</RevealHeading>
              <p className="mt-4 text-slate-600 text-lg">{growthIntro}</p>

              <div className="grid grid-cols-2 gap-4 mt-8">
                {growthMetrics.map((m, i) => {
                  const icons = [Globe, TrendingUp, Users, Zap];
                  const tints = ['text-cyan-600', 'text-indigo-600', 'text-fuchsia-600', 'text-amber-600'];
                  const Icon = icons[i % icons.length];
                  return (
                    <Reveal key={m.title} direction="down" delay={i * 0.08} className="h-full">
                      <div className="glass-card glass-hover p-5 h-full">
                        <span className="w-10 h-10 rounded-xl bg-white/70 flex items-center justify-center mb-3">
                          <Icon className={`w-5 h-5 ${tints[i % tints.length]}`} />
                        </span>
                        <p className="text-2xl font-extrabold text-gradient">
                          <CountUp value={m.value} />
                        </p>
                        <p className="text-xs text-slate-500 mt-1">{m.title}</p>
                        <p className="text-xs text-emerald-600 font-semibold mt-0.5">{m.change}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>

              {/* before → after — the six-month transformation, in figures */}
              <Reveal direction="down" delay={0.25} className="block mt-4">
                <div className="glass-card glass-sheen p-5 md:p-6">
                  <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-500">
                    <TrendingUp className="w-4 h-4" /> Before → After · 6 months
                  </p>
                  <div className="space-y-4">
                    {beforeAfterStats.map((s) => (
                      <div key={s.label} className="border-t border-white/60 pt-4 first:border-0 first:pt-0">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm text-slate-600">{s.label}</span>
                          {s.change && (
                            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-600">
                              {s.change}
                            </span>
                          )}
                        </div>
                        <div className="mt-1.5 flex items-center gap-2.5">
                          <span className="text-base font-semibold text-slate-500">{s.before}</span>
                          <ArrowRight className="w-4 h-4 shrink-0 text-blue-500" />
                          <span className="text-xl font-extrabold text-gradient">{s.after}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* RIGHT — scrolling chart panels */}
            <div className="space-y-6">
              {growthSeries.map((s, i) => (
                <Reveal key={s.gradientId} direction="up" scale delay={i * 0.05}>
                  <div className="glass-card glass-hover p-6 md:p-7">
                    <h4 className="font-bold text-slate-900">{s.title}</h4>
                    <p className="text-sm text-slate-500 mt-2 mb-4">
                      <span className="font-semibold text-slate-700">{s.from}</span>
                      <span className="mx-2 text-slate-500">→</span>
                      <span className="font-semibold text-blue-600">{s.to}</span>
                    </p>
                    <LineChart
                      data={s.data}
                      gradientFrom={s.gradientFrom}
                      gradientTo={s.gradientTo}
                      gradientId={s.gradientId}
                    />
                    <p className="text-sm text-slate-500 mt-4 pt-4 border-t border-white/60">{s.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* before / after slider — text + slider side-by-side on desktop */}
          <div className="mt-16 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <Reveal direction="left" className="text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-bold font-display text-slate-900">Before &amp; After</h3>
              <p className="text-slate-600 mt-3 text-lg">
                The same Supreme Computers store, six months apart. Drag the handle to see how the
                numbers moved across daily traffic, conversion rate, monthly engagement and search rankings.
              </p>
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                <MoveHorizontal className="w-4 h-4" /> Drag the handle to compare
              </p>
            </Reveal>
            <ScrollZoom from={0.9}>
              <BeforeAfterSlider />
            </ScrollZoom>
          </div>

          {/* growth drivers */}
          <Reveal className="block mt-16">
            <div className="glass-card p-6 md:p-10">
              <h3 className="text-2xl font-bold font-display text-slate-900 mb-7">Key Growth Drivers</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {growthDrivers.map((d) => (
                  <div key={d.title} className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-semibold text-slate-900 mb-1">{d.title}</h5>
                      <p className="text-sm text-slate-600">{d.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="mt-6 grid lg:grid-cols-3 gap-5">
            {resultStory.map((block, i) => (
              <RichBlockCard key={block.title} block={block} icon={[Search, Globe, MousePointer][i]} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- TOOLS MARQUEE ---------------- */}
      <section className="py-10 md:py-12">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-slate-500 mb-6">
            Tools I work with
          </p>
          <LogoMarquee />
        </div>
      </section>

      {/* ---------------- PROJECTS ---------------- */}
      <section ref={projectsRef} id="projects" className="section-spacing">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <Eyebrow icon={Award}>Portfolio</Eyebrow>
            <RevealHeading className="text-fluid-h2 font-bold font-display text-gradient">Projects & Achievements</RevealHeading>
          </div>

          <div className="space-y-6">
            {projects.map((role, i) => (
              <TimelineCard key={role.org} role={role} direction={i % 2 ? 'right' : 'left'} />
            ))}
          </div>

          {/* lineup showcase (hover-reveal tiles + lightbox) */}
          <div className="mt-8">
            <h3 className="text-xl font-bold font-display text-slate-900 mb-5">Selected work</h3>
            <ScrollZoom from={0.94} fade={false}>
              <ProjectsLineup items={projectDeepDives} />
            </ScrollZoom>
          </div>

          {/* key achievements */}
          <Reveal className="block mt-6">
            <div className="glass-card glass-hover p-6 md:p-8">
              <h3 className="text-xl font-bold mb-5 flex items-center gap-2 text-slate-900">
                <TrendingUp className="w-5 h-5 text-blue-600" /> Key Achievements
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {keyAchievements.map((a) => (
                  <div key={a} className="flex gap-3 text-slate-600">
                    <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- SKILLS ---------------- */}
      <section ref={skillsRef} id="skills" className="section-spacing">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <Eyebrow icon={BarChart3}>Expertise</Eyebrow>
            <RevealHeading className="text-fluid-h2 font-bold font-display text-gradient">Expertise & Toolkit</RevealHeading>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {skillGroups.map((g, i) => {
              const s = groupStyle[g.label] ?? { icon: Sparkles, text: 'text-blue-600', bg: 'bg-blue-50' };
              const Icon = s.icon;
              return (
                <Reveal key={g.label} direction="up" delay={i * 0.05} className="h-full">
                  <div className="glass-card glass-hover p-6 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`w-11 h-11 rounded-xl ${s.bg} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${s.text}`} />
                      </span>
                      <h3 className="font-bold text-slate-900">{g.label}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {g.items.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 pill-glass text-sm text-slate-700"
                        >
                          <PillMark label={item} />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
            {skillDetails.map((block, i) => (
              <RichBlockCard key={block.title} block={block} icon={[Search, Target, Globe, BarChart3][i]} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- PROCESS ---------------- */}
      <section ref={processRef} id="process" className="section-spacing">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <Eyebrow icon={Target}>Approach</Eyebrow>
            <RevealHeading className="text-fluid-h2 font-bold font-display text-gradient">How my Growth map Works</RevealHeading>
            <WordReveal
              className="mt-4 max-w-2xl mx-auto text-slate-600 text-lg"
              text="A clear workflow keeps strategy, execution and reporting connected so each section of the digital presence has a defined purpose."
            />
          </div>

          <Reveal className="block mb-8 md:mb-10">
            <ScrollZoom from={0.95} fade={false}>
              <div className="group relative h-44 md:h-64 rounded-3xl overflow-hidden premium-shadow border border-white/60">
                <img
                  src="/photos/process-strategy.jpg"
                  alt="Planning a digital growth strategy together"
                  width={1200}
                  height={800}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-600/25 via-indigo-500/12 to-cyan-400/10 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/65 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5 md:p-8">
                  <p className="text-white font-display font-bold text-lg md:text-2xl max-w-lg leading-tight">
                    Strategy, execution and reporting — connected end to end.
                  </p>
                </div>
              </div>
            </ScrollZoom>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5">
            {workflowSteps.map((block, i) => (
              <RichBlockCard
                key={block.title}
                block={block}
                icon={[Search, Target, Zap, LineChartIcon][i]}
                direction={i % 2 ? 'right' : 'left'}
                delay={i * 0.06}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- EDUCATION ---------------- */}
      <section ref={educationRef} id="education" className="section-spacing">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <Eyebrow icon={GraduationCap}>Background</Eyebrow>
            <RevealHeading className="text-fluid-h2 font-bold font-display text-gradient">Education & Credentials</RevealHeading>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {education.map((edu, i) => (
              <Reveal key={edu.degree} direction={i % 2 ? 'right' : 'left'} className="h-full">
                <div className="glass-card glass-hover p-6 h-full">
                  <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 mb-1">
                    <Calendar className="w-4 h-4" /> {edu.start} – {edu.end}
                  </p>
                  <h3 className="text-lg font-bold text-slate-900">{edu.degree}</h3>
                  <p className="text-slate-600">{edu.school}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-5 mt-5">
            <Reveal direction="left" className="h-full">
              <div className="glass-card glass-hover p-6 h-full">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-900">
                  <Award className="w-5 h-5 text-blue-600" /> Certifications
                </h3>
                <ul className="space-y-2">
                  {certifications.map((c) => (
                    <li key={c} className="flex gap-3 text-slate-600">
                      <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.08} className="h-full">
              <div className="glass-card glass-hover p-6 h-full">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-900">
                  <Languages className="w-5 h-5 text-blue-600" /> Languages
                </h3>
                <ul className="space-y-2">
                  {languages.map((l) => (
                    <li key={l.name} className="flex justify-between text-slate-600">
                      <span>{l.name}</span>
                      <span className="text-slate-500">{l.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- TESTIMONIALS / REVIEWS ---------------- */}
      <section ref={testimonialsRef} id="reviews" className="section-spacing">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <Eyebrow icon={Quote}>Testimonials</Eyebrow>
            <RevealHeading className="text-fluid-h2 font-bold font-display text-gradient">What Leaders &amp; Founders Say</RevealHeading>
            <p className="mt-4 max-w-2xl mx-auto text-slate-600 text-lg">
              Kind words from the managing directors, chief executives and founders I have had the
              privilege of working alongside.
            </p>
          </div>

          <ScrollZoom from={0.95} fade={false} className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} direction="up" delay={i * 0.08} className="h-full">
                <div className="glass-card glass-hover glass-sheen p-7 md:p-8 flex flex-col h-full">
                  <Quote className="w-9 h-9 text-blue-500/70 shrink-0" />
                  <div className="flex gap-1 mt-4" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 mt-4 leading-relaxed flex-1">{`“${t.quote}”`}</p>
                  <div className="mt-6 pt-5 border-t border-white/60 flex items-center gap-3">
                    <span className="w-12 h-12 rounded-full gradient-primary animate-gradient grid place-items-center text-white font-display font-bold shadow-md ring-2 ring-white/50 shrink-0">
                      {t.initials}
                    </span>
                    <div>
                      <p className="font-bold text-slate-900 leading-tight">{t.name}</p>
                      <p className="text-sm text-blue-600 font-semibold">{t.role}</p>
                      <p className="text-xs text-slate-500">{t.company}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </ScrollZoom>
        </div>
      </section>

      {/* ---------------- BLOG / WRITING ---------------- */}
      <section id="blog" className="section-spacing">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <Eyebrow icon={BookOpen}>Writing</Eyebrow>
            <RevealHeading className="text-fluid-h2 font-bold font-display text-gradient">From the Blog</RevealHeading>
            <p className="mt-4 max-w-2xl mx-auto text-slate-600 text-lg">
              Practical digital-marketing guides I publish on Medium — from SEO foundations to the
              strategies that compound into real business growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>

          <div className="mt-9 flex justify-center">
            <Magnetic>
              <button onClick={() => navigate('/blog')} className="glass-btn">
                Read all articles <ArrowRight className="w-4 h-4" />
              </button>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* ---------------- CONTACT ---------------- */}
      <section ref={contactRef} id="contact" className="section-spacing">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <Eyebrow icon={Mail}>Contact</Eyebrow>
          <RevealHeading className="text-fluid-h2 font-bold font-display text-gradient mb-3">Let's Create Something Remarkable</RevealHeading>
          <p className="text-slate-600 mb-5 max-w-3xl mx-auto">
            Currently working full-time — and available for freelance work and project-based collaborations
            alongside it, ready to support brands that need practical digital growth.
          </p>
          <p className="text-slate-500 mb-10 max-w-3xl mx-auto">
            I can support SEO improvements, Google Ads and Meta Ads optimisation, Shopify store updates,
            landing pages, CRM workflows, analytics reporting and conversion-focused website refinements.
          </p>

          <div className="grid md:grid-cols-3 gap-4 text-left mb-6">
            {[
              {
                title: 'Currently full-time',
                body: 'Working full-time in a digital marketing role — and taking on freelance and project work alongside it, around my current commitments.',
                icon: Briefcase,
              },
              {
                title: 'Freelance support',
                body: 'Flexible monthly support across SEO audits, ad optimisation, Shopify updates, content improvements and tracking setup.',
                icon: Users,
              },
              {
                title: 'Project work',
                body: 'Open to focused projects such as landing pages, CRM builds, campaign launches, website optimisation and lead-generation workflows.',
                icon: Layers,
              },
            ].map(({ title, body, icon: Icon }, i) => (
              <Reveal key={title} direction="up" delay={i * 0.06} className="h-full">
                <div className="glass-card glass-hover p-5 h-full">
                  <span className="w-11 h-11 rounded-xl bg-white/70 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </span>
                  <h3 className="font-bold text-slate-900">{title}</h3>
                  <p className="text-sm text-slate-600 mt-2">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
            <a href={`mailto:${profile.email}`} className="glass-card glass-hover p-5 flex items-center gap-4">
              <Mail className="w-6 h-6 text-blue-600 shrink-0" />
              <span>
                <span className="block text-xs text-slate-500">Email</span>
                <span className="font-semibold text-blue-600">Send a message</span>
              </span>
            </a>
            <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} className="glass-card glass-hover p-5 flex items-center gap-4">
              <Phone className="w-6 h-6 text-blue-600 shrink-0" />
              <span>
                <span className="block text-xs text-slate-500">Phone</span>
                <span className="font-semibold text-blue-600">Request a call</span>
              </span>
            </a>
            <div className="glass-card p-5 flex items-center gap-4">
              <MapPin className="w-6 h-6 text-blue-600 shrink-0" />
              <span>
                <span className="block text-xs text-slate-500">Location</span>
                <span className="font-semibold text-slate-800">{profile.location}</span>
              </span>
            </div>
            {socialLinks.map(({ label, href, icon: Icon, action, tint }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="glass-card glass-hover p-5 flex items-center gap-4"
              >
                <Icon className={`w-6 h-6 shrink-0 ${tint}`} />
                <span>
                  <span className="block text-xs text-slate-500">{label}</span>
                  <span className="font-semibold text-blue-600">{action}</span>
                </span>
              </a>
            ))}
          </div>

          {/* contact form + embedded location map — side-by-side on desktop,
              stacked on mobile, so the full width is used */}
          <div className="grid lg:grid-cols-2 gap-6 mt-8 text-left items-stretch">
            <ContactForm />
            <Reveal className="block h-full">
              <div className="glass-card overflow-hidden p-2 h-full flex flex-col min-h-[20rem]">
                <iframe
                  title="Surendran M — P P Garden, Aminjikarai, Chennai 600029"
                  src="https://maps.google.com/maps?q=P%20P%20Garden%2C%20Aminjikarai%2C%20Chennai%20600029&z=15&output=embed"
                  className="w-full flex-1 min-h-[16rem] rounded-2xl border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <p className="mt-2 mb-1 flex items-center justify-center gap-1.5 text-sm text-slate-500">
                  <MapPin className="w-4 h-4 text-blue-600" /> P P Garden, Aminjikarai, Chennai – 600029
                </p>
              </div>
            </Reveal>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            Prefer email or a quick call? Use the options above — or connect with me on LinkedIn.
          </p>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section id="faq" className="section-spacing">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <Eyebrow icon={HelpCircle}>FAQ</Eyebrow>
            <RevealHeading className="text-fluid-h2 font-bold font-display text-gradient">Questions, Answered</RevealHeading>
          </div>
          <ScrollZoom from={0.95}>
            <Faq />
          </ScrollZoom>
        </div>
      </section>

      <Footer onBackToTop={() => scrollTo(homeRef)} />
    </div>
  );
}

export default App;
