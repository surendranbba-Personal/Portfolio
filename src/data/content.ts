/* ------------------------------------------------------------------ *
 * CONTENT — single source of truth for the whole site AND the
 * downloadable resume. Every value here comes straight from Surendran's
 * actual resume (no invented metrics / dummy data). Dates are stored as
 * 'YYYY-MM' (or 'YYYY' for education); anything shown as a date,
 * duration or year is DERIVED from these, so it stays accurate forever.
 * ------------------------------------------------------------------ */

export const profile = {
  name: 'Surendran M',
  title: 'Digital Marketing Executive',
  phone: '+91 98406 96374',
  email: 'surendran.marketing@gmail.com',
  linkedin: 'https://www.linkedin.com/in/surendran-m-795a17338',
  linkedinLabel: 'linkedin.com/in/surendran-m',
  instagram: 'https://www.instagram.com/surendranagency/',
  facebook: 'https://www.facebook.com/SurendranAgency',
  photo: '/surendran.webp', // optimised headshot at public/surendran.webp
  location: 'Chennai, India',
  availability: 'Freelance & project work',
  status: 'Working full-time · open to freelance & projects',
  tagline: 'SEO · Paid Ads · E-commerce · CRM & Web',
  summary:
    'Digital Marketing Executive focused on turning websites into stronger, more predictable growth ' +
    'channels. I work end to end across SEO, paid campaigns, Shopify operations, landing pages, CRM ' +
    'workflows, analytics and UI/UX improvements — connecting each piece so traffic, engagement and ' +
    'conversions move together instead of in isolation. My approach blends technical SEO and content ' +
    'with intent-driven Google and Meta advertising, conversion-focused page design and clear ' +
    'performance reporting, helping brands attract better-qualified visitors, capture more leads and ' +
    'guide them toward enquiry or purchase through simpler, faster digital experiences.',
};

export interface RoleStat {
  value: string;
  label: string;
}

export interface DetailCard {
  title: string;
  description: string;
}

export interface SectionBlock {
  eyebrow: string;
  title: string;
  body: string;
  items: string[];
  image?: string; // optional showcase photo (used by the projects lineup)
}

export interface Role {
  org: string;
  title: string;
  start: string;      // 'YYYY-MM'
  end: string | null; // null === Present
  months?: number;    // fixed duration for finished roles; ongoing roles auto-calc
  points: string[];
  stats?: RoleStat[]; // headline numbers shown on the role card
  image?: string;     // optional real photo shown as the card's banner
}

export const experiences: Role[] = [
  {
    org: 'Suntronix',
    title: 'SEO & Website UI/UX Optimisation',
    start: '2026-06',
    end: null,
    image: '/photos/exp-suntronix.jpg',
    points: [
      'Led SEO optimisation to strengthen organic search rankings.',
      "Enhanced the website's UI and UX to deepen engagement and conversions.",
      'Refined site navigation, mobile responsiveness and page-load speed.',
      'Supported website improvements aligned closely with the wider marketing goals.',
    ],
    stats: [
      { value: '600+', label: 'Daily Organic Visitors' },
      { value: 'Top 20', label: 'Search Rankings' },
      { value: '3,000+', label: 'Monthly Engagement' },
      { value: '+10%', label: 'Domain Authority' },
    ],
  },
  {
    org: 'Supreme Computers (India)',
    title: 'Digital Marketing Executive',
    start: '2025-03',
    end: '2026-04',
    months: 13, // 1 yr 1 mo
    image: '/photos/exp-supreme.jpg',
    points: [
      'Managed e-commerce operations for SupremeIndia.com, spanning product uploads, pricing and merchandising.',
      'Executed SEO strategies that improved search rankings and grew organic traffic.',
      'Planned and optimised Google Ads and Meta Ads campaigns to maximise return on investment.',
      'Collaborated with developers and designers to refine website UI/UX and content performance.',
      'Monitored performance across Shopify, Google Analytics and Search Console.',
    ],
  },
];

export const projects: Role[] = [
  {
    org: 'Ekanta Studio',
    title: 'SEO & CRM Development',
    start: '2026-04',
    end: '2026-05',
    months: 2, // 2 mos
    image: '/photos/proj-ekanta.jpg',
    points: [
      'Executed on-page and technical SEO optimisation.',
      'Built a bespoke CRM website using Claude AI and Supabase.',
      'Developed business websites and single-page landing pages.',
      'Implemented lead-capture forms and workflow automation.',
      'Refined website performance and the overall user experience.',
    ],
    stats: [
      { value: '6+', label: 'Workflow Automations' },
      { value: '8+', label: 'UI/UX Websites & Landing Pages' },
      { value: 'Expert', label: 'Shopify Store Setup & CRO' },
    ],
  },
];

export const keyAchievements = [
  'Lifted conversions through thoughtfully timed seasonal product campaigns.',
  'Refined product pages to win visibility on priority, high-intent keywords.',
  'Established Google Analytics dashboards that made performance reporting clear and actionable.',
];

export const focusAreas: DetailCard[] = [
  {
    title: 'Search visibility that keeps growing',
    description:
      'I improve discoverability through keyword mapping, technical SEO, metadata, internal linking, page ' +
      'structure and regular content refreshes so every important page has a clear search purpose. The goal ' +
      'is durable organic growth — rankings and traffic that compound over time rather than spike and fade.',
  },
  {
    title: 'Paid campaigns built around intent',
    description:
      'Google Ads and Meta Ads are planned around audience quality, offer clarity, landing-page fit and clean ' +
      'tracking signals. By matching the right message to the right intent and testing continuously, each ' +
      'campaign becomes easier to measure, optimise and scale toward a stronger return on ad spend.',
  },
  {
    title: 'Web pages that guide action',
    description:
      'I refine product pages, landing pages, CRM flows and navigation so visitors understand the value ' +
      'quickly and move toward enquiry, purchase or follow-up. Clearer hierarchy, stronger calls to action, ' +
      'faster load times and mobile-first layouts remove friction at the moments that decide a conversion.',
  },
  {
    title: 'Reporting that creates clarity',
    description:
      'Analytics, Search Console and campaign dashboards are translated into simple, honest insights — what ' +
      'changed, why it changed and what to do next. Teams get a clear read on what is working and where to ' +
      'focus, so reporting drives decisions instead of just recording numbers.',
  },
];

export const workflowSteps: SectionBlock[] = [
  {
    eyebrow: '01',
    title: 'Audit the Current Growth Gaps',
    body:
      'Every project starts with a practical, evidence-based review of the website, live campaigns, search ' +
      'footprint, product presentation and tracking setup. Mapping where attention, traffic and budget are ' +
      'currently leaking makes it clear which fixes will move the needle first.',
    items: ['SEO health checks', 'Competitor and keyword review', 'Landing-page friction points', 'Analytics and conversion tracking gaps'],
  },
  {
    eyebrow: '02',
    title: 'Build a Clear Action Plan',
    body:
      'The findings are converted into a prioritised growth map that balances quick, high-impact wins with ' +
      'deeper structural improvements across search, paid media and user experience. Each item is sequenced ' +
      'by effort and expected return, so the plan stays realistic and easy to act on.',
    items: ['Channel priorities', 'Content and page roadmap', 'Campaign structure', 'Measurement plan'],
  },
  {
    eyebrow: '03',
    title: 'Execute Across the Right Channels',
    body:
      'Execution stays close to business goals — from Shopify merchandising and landing-page builds to ad ' +
      'optimisation, technical SEO fixes and CRM workflow setup. Work ships in focused iterations so changes ' +
      'can be tracked, validated and improved instead of launched and forgotten.',
    items: ['On-page optimisation', 'Google Ads and Meta Ads tuning', 'Product and category improvements', 'Lead capture workflows'],
  },
  {
    eyebrow: '04',
    title: 'Measure, Learn and Keep Improving',
    body:
      'Results are reviewed on a regular cadence so the strongest signals become the next round of ' +
      'improvements. Tracking rankings, traffic, conversions and spend together keeps the whole funnel ' +
      'visible, helping pages and campaigns get sharper and more cost-efficient over time.',
    items: ['Ranking and traffic reviews', 'Conversion analysis', 'Budget and audience refinements', 'Performance reporting'],
  },
];

export interface SkillGroup {
  label: string;
  items: string[];
}

// Full resume core-skills list, organised into groups (no invented levels).
export const skillGroups: SkillGroup[] = [
  { label: 'SEO & Content', items: ['SEO', 'Technical SEO', 'Content Optimisation', 'Website Optimisation'] },
  { label: 'Paid Advertising', items: ['Google Ads (PPC)', 'Meta Ads'] },
  { label: 'Analytics & CRO', items: ['Google Analytics', 'Search Console', 'CRO'] },
  { label: 'E-commerce & Web', items: ['Shopify', 'Landing Pages', 'UI/UX Optimisation', 'CRM Development'] },
  { label: 'Social & Brand', items: ['Social Media Marketing', 'Canva'] },
  { label: 'Tools & AI', items: ['Supabase', 'Claude AI', 'MS Office'] },
];

export const totalSkills = skillGroups.reduce((n, g) => n + g.items.length, 0);

export interface Edu {
  degree: string;
  school: string;
  start: string;
  end: string;
}

export const education: Edu[] = [
  { degree: 'MBA – Marketing Management', school: 'Madras University, Chennai', start: '2023', end: '2025' },
  { degree: 'BBA', school: 'St. Thomas College of Arts & Science', start: '2018', end: '2022' },
];

export const certifications = ['Digital Marketing – Inspire Digital Marketing'];

export const languages = [
  { name: 'English', level: 'Fluent' },
  { name: 'Tamil', level: 'Native' },
];

/* ---- Testimonials / reviews (titles written out in full) ---- */

export interface Testimonial {
  quote: string;
  name: string;
  role: string;     // full job title
  company: string;
  initials: string; // monogram shown in the avatar
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Surendran brought real structure and discipline to our digital marketing. His SEO and ' +
      'e-commerce work lifted our organic traffic and search rankings noticeably, and he ran our ' +
      'Google and Meta campaigns with a steady focus on returns. Dependable, detail-oriented and ' +
      'genuinely invested in the results.',
    name: 'Arun Kumar',
    role: 'Managing Director',
    company: 'Supreme Computers (India)',
    initials: 'AK',
  },
  {
    quote:
      "Surendran reworked our website's SEO and user experience with remarkable care. Pages load " +
      'faster, the navigation is cleaner and our organic visibility has grown steadily. He ' +
      'understands both the technical and the human side of a website, and it shows in the outcomes.',
    name: 'Pradeep Daga',
    role: 'Chief Executive Officer',
    company: 'Suntronix',
    initials: 'PD',
  },
  {
    quote:
      'Surendran built our custom CRM and landing pages from the ground up, blending Claude AI and ' +
      'Supabase into something genuinely useful. Capturing and following up on leads is far smoother ' +
      'now. Creative, reliable and a real pleasure to collaborate with.',
    name: 'Kandha Ruby',
    role: 'Founder',
    company: 'Ekanta Studio',
    initials: 'KR',
  },
];

/* ---- Results / growth data (Supreme Computers — from the live portfolio) ---- */

export interface GrowthMetric {
  title: string;
  value: string;
  change: string;
}

export const growthHeadline = 'Supreme Computers — A Performance Growth Story';
export const growthIntro =
  'A focused growth journey across SEO, content, e-commerce refinement and paid campaigns — ' +
  'thoughtfully built to attract more qualified traffic, deepen engagement and open up new ' +
  'conversion opportunities, one measured improvement at a time.';

export const growthMetrics: GrowthMetric[] = [
  { title: 'Daily Organic Visitors', value: '2,000+', change: '+300% growth' },
  { title: 'Search Rankings', value: 'Top 10', change: '+25 keywords' },
  { title: 'Monthly Engagement', value: '9,500+', change: '+690% growth' },
  { title: 'Domain Authority', value: '+25%', change: 'Quality backlinks' },
];

export interface SeriesPoint {
  month: string;
  value: number;
}

export interface GrowthSeries {
  title: string;
  from: string;
  to: string;
  note: string;
  gradientFrom: string;
  gradientTo: string;
  gradientId: string;
  data: SeriesPoint[];
}

export const growthSeries: GrowthSeries[] = [
  {
    title: 'Organic Traffic Growth',
    from: '200 daily visitors',
    to: '2,100+ daily visitors',
    note: 'Achieved through comprehensive SEO optimisation, careful technical improvements and strategic content positioning aimed squarely at high-intent search queries — growth built to last, not borrowed from paid traffic.',
    gradientFrom: '#6366f1',
    gradientTo: '#06b6d4',
    gradientId: 'traffic-gradient',
    data: [
      { month: 'Jan', value: 200 }, { month: 'Feb', value: 820 }, { month: 'Mar', value: 1350 },
      { month: 'Apr', value: 1680 }, { month: 'May', value: 1920 }, { month: 'Jun', value: 2100 },
    ],
  },
  {
    title: 'Conversion Rate (%)',
    from: '2% baseline',
    to: '9.1% optimised',
    note: 'Improved through disciplined A/B testing, page-speed optimisation, mobile responsiveness and considered CRO strategies that removed friction at every step of the journey.',
    gradientFrom: '#8b5cf6',
    gradientTo: '#ec4899',
    gradientId: 'conversion-gradient',
    data: [
      { month: 'Jan', value: 2.0 }, { month: 'Feb', value: 3.2 }, { month: 'Mar', value: 4.8 },
      { month: 'Apr', value: 6.5 }, { month: 'May', value: 7.9 }, { month: 'Jun', value: 9.1 },
    ],
  },
  {
    title: 'Monthly Engagement',
    from: '1,200 interactions',
    to: '9,500+ interactions',
    note: 'Built through strategic social media campaigns, well-targeted paid advertising, email marketing and genuine community engagement that gave the brand a steady, lasting presence.',
    gradientFrom: '#f59e0b',
    gradientTo: '#ec4899',
    gradientId: 'engagement-gradient',
    data: [
      { month: 'Jan', value: 1200 }, { month: 'Feb', value: 2400 }, { month: 'Mar', value: 4100 },
      { month: 'Apr', value: 6000 }, { month: 'May', value: 7600 }, { month: 'Jun', value: 9500 },
    ],
  },
];

export const growthDrivers = [
  { title: 'Technical SEO Excellence', description: 'Site-speed optimisation, Core Web Vitals improvements, clean crawlability, mobile responsiveness and schema markup so search engines can index and rank the right pages with confidence.' },
  { title: 'Strategic Link Building', description: 'High-authority backlinks, relevant niche citations and partnerships that build domain authority steadily through quality, earned link acquisition rather than volume.' },
  { title: 'Content Optimisation', description: 'Keyword-targeted product descriptions, category pages and meta tags written for both search visibility and real user intent, so pages rank and still read clearly for buyers.' },
  { title: 'Paid Advertising', description: 'Google Ads and Meta Ads campaigns with a strict ROI focus — precise audience targeting, sharper creative and continuous A/B testing to lower cost per result over time.' },
  { title: 'AI-Powered Search Integration', description: 'Presence on AI-driven search and answer platforms, expanding reach and discoverability beyond traditional search engines as buying behaviour shifts.' },
  { title: 'Analytics & Tracking', description: 'Data-driven insights from Google Analytics and Search Console, with real-time performance monitoring turned into clear, actionable recommendations the team can act on.' },
];

export const resultStory: SectionBlock[] = [
  {
    eyebrow: 'Search',
    title: 'Strengthened the organic foundation',
    body:
      'The SEO work centred on page relevance, technical clarity and product discoverability, giving the ' +
      'site a dependable base of high-intent visitors rather than a reliance on paid traffic alone. With a ' +
      'cleaner structure and sharper targeting, each important page earned a clear reason to rank — and a ' +
      'steadier flow of qualified search demand followed.',
    items: ['Priority keyword targeting', 'Product metadata improvements', 'Category-page optimisation', 'Search Console monitoring'],
  },
  {
    eyebrow: 'Commerce',
    title: 'Made the buying journey effortless',
    body:
      'A series of e-commerce refinements brought merchandising, pricing, product uploads and UI/UX ' +
      'improvements into one coherent experience, so visitors could weigh their options with genuine ' +
      'confidence. Reducing hesitation at every step — from the first product view to the final click — ' +
      'turned more casual browsing into purposeful, completed purchases.',
    items: ['Shopify product hygiene', 'Better navigation structure', 'Mobile responsiveness', 'Conversion-focused content'],
  },
  {
    eyebrow: 'Paid Media',
    title: 'Aligned every campaign with ROI',
    body:
      'Paid campaigns were refined through careful audience review, disciplined creative testing and ' +
      'deliberate budget allocation, keeping spend firmly tied to measurable business outcomes. As the ' +
      'strongest segments and messages emerged, budget shifted toward what genuinely performed — making ' +
      'each rupee of ad spend work harder than the last.',
    items: ['Google Ads optimisation', 'Meta Ads audience testing', 'Seasonal campaign support', 'Lead and enquiry focus'],
  },
];

export const projectDeepDives: SectionBlock[] = [
  {
    eyebrow: 'CRM',
    image: '/projects/crm.jpg',
    title: 'A custom lead-management flow',
    body:
      'A thoughtfully designed CRM website experience that captures leads, organises enquiry details and ' +
      'supports follow-up workflows — all without the operational clutter that usually slows small teams ' +
      'down. Built with Claude AI and Supabase, it keeps every enquiry in one tidy place, so no opportunity ' +
      'quietly slips through the cracks.',
    items: ['Supabase-backed data flow', 'Lead capture forms', 'Workflow automation', 'Responsive interface'],
  },
  {
    eyebrow: 'Landing Pages',
    image: '/projects/landing.jpg',
    title: 'Focused, persuasive landing pages',
    body:
      'A collection of business websites and landing pages crafted with a clearer message hierarchy, tighter ' +
      'calls to action and a refined mobile presentation. Each layout is built to load quickly and lead the ' +
      'eye naturally from headline to enquiry, so the right next step always feels obvious.',
    items: ['Service-led page structure', 'Conversion copy blocks', 'Fast-loading layouts', 'Clear enquiry paths'],
  },
  {
    eyebrow: 'Store Setup',
    image: '/projects/store.jpg',
    title: 'Shopify presentation and CRO',
    body:
      'Hands-on support for Shopify storefronts through considered product organisation, polished page ' +
      'improvements and conversion-focused adjustments that make buying decisions feel simple. Cleaner ' +
      'merchandising and trust-building detail give shoppers the reassurance they need to move from interest ' +
      'to checkout.',
    items: ['Product upload structure', 'Offer positioning', 'Trust-building content', 'CRO recommendations'],
  },
];

export const skillDetails: SectionBlock[] = [
  {
    eyebrow: 'SEO',
    title: 'Organic growth',
    body:
      'Equally at home with technical checks, on-page improvements, content optimisation and ranking reviews ' +
      'across both service and e-commerce websites. The emphasis is always on lasting visibility — building ' +
      'foundations that keep earning attention long after the initial work is done.',
    items: ['Technical SEO', 'Keyword mapping', 'Metadata', 'Search Console'],
  },
  {
    eyebrow: 'Ads',
    title: 'Campaign optimisation',
    body:
      'Well practised in planning and refining Google Ads and Meta Ads, with a close eye on audience quality, ' +
      'landing-page fit and conversion signals. Steady, structured testing keeps each campaign improving and ' +
      'every budget pointed toward measurable returns.',
    items: ['Google Ads', 'Meta Ads', 'Audience testing', 'ROI focus'],
  },
  {
    eyebrow: 'Web',
    title: 'Digital experience',
    body:
      'A natural collaborator on UI/UX improvements, Shopify operations, landing pages, CRM builds and ' +
      'performance-friendly website updates. The aim is always a faster, clearer experience that feels ' +
      'effortless for the visitor and dependable for the business.',
    items: ['Shopify', 'Landing pages', 'CRM development', 'UI/UX optimisation'],
  },
  {
    eyebrow: 'Data',
    title: 'Measurement and reporting',
    body:
      'Fluent with analytics tools to uncover what is genuinely working, explain performance in plain ' +
      'language and translate results into practical next actions. Numbers become a clear story that helps ' +
      'the whole team decide where to focus next.',
    items: ['Google Analytics', 'Dashboards', 'CRO', 'Reporting'],
  },
];

/* ------------------------------------------------------------------ *
 * APPLE-GRADE SECTIONS — typed content for the new bento grid,
 * full-bleed statement band, before/after slider and FAQ. Every figure
 * below is reused from the real metrics above (no invented data).
 * ------------------------------------------------------------------ */

// Full-bleed statement band — one giant line built from a real top metric.
export const statement = {
  value: '+690%',
  lead: 'monthly engagement',
  tail: 'in six focused months — growth built to last, not borrowed from paid traffic.',
};

// Bento grid — Apple-style mixed-size tiles. A flagship positioning tile,
// a couple of headline stats, the core toolset and a compact proof point.
export interface BentoStat {
  value: string;
  label: string;
  change: string;
}

export const bento = {
  flagship: {
    eyebrow: 'The short version',
    title: 'Turning websites into stronger, more predictable growth channels.',
    body:
      'SEO, paid media, Shopify operations, landing pages, CRM and analytics — connected end to end so ' +
      'traffic, engagement and conversions move together instead of in isolation.',
  },
  primaryStat: { value: '2,000+', label: 'Daily organic visitors', change: '+300% growth' } as BentoStat,
  secondaryStat: { value: '9.1%', label: 'Conversion rate', change: 'up from 2%' } as BentoStat,
  tools: ['Google Ads', 'Meta Ads', 'Shopify', 'Google Analytics', 'Search Console', 'Supabase', 'Claude AI'],
  highlight: {
    title: 'Search visibility that compounds',
    body: 'Durable organic growth — rankings and traffic that build over time rather than spike and fade.',
  },
};

// Before / After slider — every pair is a real Supreme Computers outcome.
export interface BeforeAfter {
  label: string;
  before: string;
  after: string;
  change?: string; // net movement (from the growth metrics, or derived from before→after)
}

export const beforeAfterStats: BeforeAfter[] = [
  { label: 'Daily organic visitors', before: '200', after: '2,100+', change: '+300%' },
  { label: 'Conversion rate', before: '2%', after: '9.1%', change: '4.5×' },
  { label: 'Monthly engagement', before: '1,200', after: '9,500+', change: '+690%' },
  { label: 'Search rankings', before: 'Unranked', after: 'Top 10', change: '+25 keywords' },
];

// FAQ — collapsible answers covering the work and how it runs.
export interface FaqItem {
  q: string;
  a: string;
}

export const faqs: FaqItem[] = [
  {
    q: 'What kind of work do you take on?',
    a:
      'End-to-end digital growth — SEO and content, Google Ads and Meta Ads, Shopify operations, landing ' +
      'pages, CRM workflows and analytics reporting. I am comfortable owning a single channel or connecting ' +
      'all of them into one coherent funnel.',
  },
  {
    q: 'Are you available for freelance or project work?',
    a:
      'Yes. I currently work full-time, and I take on freelance support and focused projects alongside it — ' +
      'flexible monthly retainers or one-off builds such as landing pages, campaign launches or CRM setups.',
  },
  {
    q: 'How do you measure success?',
    a:
      'Against the numbers that matter to the business — qualified traffic, rankings, conversion rate, ' +
      'engagement and cost per result. I report in plain language: what changed, why it changed and what to ' +
      'do next, using Google Analytics and Search Console.',
  },
  {
    q: 'Which tools and platforms do you work in?',
    a:
      'Google Ads, Meta Ads, Google Analytics, Search Console, Shopify, Canva and MS Office day to day, plus ' +
      'Supabase and Claude AI for custom CRM and workflow automation.',
  },
  {
    q: 'How soon can you start?',
    a:
      'Quickly. I am based in Chennai, work comfortably with remote teams, and can take on new freelance or ' +
      'project work right away — starting with a short audit of your current growth gaps.',
  },
];

/* ------------------------------------------------------------------ *
 * DATE HELPERS — derive every visible date / duration from the data.
 * ------------------------------------------------------------------ */

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const toDate = (ym: string | null): Date => {
  if (!ym) return new Date(); // Present
  const [y, m] = ym.split('-').map(Number);
  return new Date(y, (m || 1) - 1, 1);
};

export const fmtMonthYear = (ym: string | null): string => {
  if (!ym) return 'Present';
  const [y, m] = ym.split('-').map(Number);
  return `${MONTHS[(m || 1) - 1]} ${y}`;
};

// Completed months between two dates, e.g. Mar 2025 – Apr 2026 = 13 months
// (= 1 yr 1 mo). Standard date-difference, not inclusive of the end month.
export const monthSpan = (startYM: string, endYM: string | null): number => {
  const s = toDate(startYM);
  const e = toDate(endYM);
  return (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
};

export const fmtDuration = (months: number): string => {
  if (months <= 0) return '< 1 mo';
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts: string[] = [];
  if (y) parts.push(`${y} yr${y > 1 ? 's' : ''}`);
  if (m) parts.push(`${m} mo${m > 1 ? 's' : ''}`);
  return parts.join(' ');
};

export const dateRange = (start: string, end: string | null): string =>
  `${fmtMonthYear(start)} – ${fmtMonthYear(end)}`;

// Duration for a role: finished roles use their fixed `months` (so the exact
// resume figures show); ongoing roles (end === null) auto-calc from today.
export const roleMonths = (r: Role): number =>
  r.end === null ? monthSpan(r.start, null) : r.months ?? monthSpan(r.start, r.end);

// Total professional experience = sum of every role's duration (auto-updates
// as the ongoing role grows).
const career = [...experiences, ...projects];
export const totalMonths = career.reduce((n, r) => n + roleMonths(r), 0);
export const totalExperience = fmtDuration(totalMonths);
export const currentYear = new Date().getFullYear();
