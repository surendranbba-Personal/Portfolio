import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { ContactForm } from '../components/ContactForm';
import { navigate } from '../lib/router';

export function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState('');

  const choosePlan = (plan: string) => {
    setSelectedPlan(plan);
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900">
      <div className="app-bg">
        <div className="blob w-80 h-80 bg-indigo-300 top-10 -left-10 float-slow" />
        <div className="blob w-72 h-72 bg-cyan-300 top-1/3 right-0 float" />
        <div className="blob w-80 h-80 bg-fuchsia-300 bottom-20 left-1/4 float-slow" />
      </div>

      <nav className="fixed inset-x-0 top-0 z-50 glass-nav">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <button onClick={() => navigate('/')} className="group flex items-center gap-3 text-left">
            <span className="grid h-11 w-11 place-items-center rounded-2xl gradient-primary text-white font-display font-bold shadow-md ring-2 ring-white/50">
              SM
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">
              Surendran M
            </span>
          </button>

          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/blog')} className="glass-btn-ghost">
              Read the blog
            </button>
          </div>
        </div>
      </nav>

      <main className="relative pt-28 pb-24">
        <section className="mx-auto max-w-6xl px-4 text-center">
          <span className="inline-flex items-center justify-center rounded-full pill-glass px-4 py-2 text-sm font-semibold text-slate-700">
            Shopify pricing in a polished product-plan format
          </span>

          <h1 className="mt-6 text-fluid-hero font-display font-extrabold text-gradient">
            Shopify packages that are easy to compare
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
            Compare clear Shopify service tiers, delivery expectations, and required client inputs so you can choose with confidence.
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Use the form below to send your request directly and share the details needed for a quote.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })} className="glass-btn inline-flex items-center gap-2">
              Contact for a quote <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => navigate('/blog')} className="glass-btn-ghost">
              Explore blog insights
            </button>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 section-spacing">
          <div className="glass-card p-8 lg:p-10">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">How to use this page</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">What this pricing page shows</h2>
            <p className="mt-4 text-slate-600">See the exact services included in each package, compare the main differences, and understand what is needed before the project begins.</p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Package clarity</p>
                <p className="mt-3 text-slate-600">Each plan shows what is delivered so you can pick the one that fits your Shopify goals.</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Delivery details</p>
                <p className="mt-3 text-slate-600">Payment timings, requirements, and project steps are listed clearly to reduce uncertainty.</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Ready to start</p>
                <p className="mt-3 text-slate-600">You can see what is expected from you before the work begins, which makes onboarding faster.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 section-spacing">
          <div className="grid gap-6 lg:grid-cols-3">
            <article className="glass-card glass-hover p-8">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">🚀 Starter Plan</p>
              <h2 className="mt-4 text-3xl font-bold text-slate-900">₹12,999</h2>
              <p className="mt-3 text-slate-600">Ideal for startups and new Shopify stores needing essential customization, speed improvements, and a polished storefront.</p>

              <ul className="mt-6 space-y-3 text-slate-600">
                <li>Store development & Shopify setup</li>
                <li>Homepage customization</li>
                <li>Collection page customization</li>
                <li>Product page customization</li>
                <li>Basic theme customization</li>
                <li>Header & footer setup</li>
                <li>Navigation setup</li>
                <li>Mobile responsive design</li>
                <li>Basic speed optimization</li>
                <li>Image optimization</li>
                <li>UX improvements</li>
                <li>SEO suggestions for homepage, collection & product pages</li>
                <li>2 revision rounds</li>
                <li>7 days post-delivery support</li>
              </ul>

              <button onClick={() => choosePlan('🚀 Starter Plan')} className="glass-btn mt-8 inline-flex">
                Choose starter
              </button>
            </article>

            <article className="glass-card glass-hover p-8">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">⭐ Professional Plan</p>
              <h2 className="mt-4 text-3xl font-bold text-slate-900">₹19,999</h2>
              <p className="mt-3 text-slate-600">Includes everything in Starter plus premium design, advanced SEO, and conversion-focused enhancements.</p>

              <ul className="mt-6 space-y-3 text-slate-600">
                <li>Everything in Starter</li>
                <li>Advanced homepage design</li>
                <li>Premium collection layout</li>
                <li>Premium product layout</li>
                <li>Advanced theme customization</li>
                <li>Improved navigation & user flow</li>
                <li>Better mobile experience</li>
                <li>Advanced speed optimization</li>
                <li>Internal linking suggestions</li>
                <li>Basic schema markup recommendations</li>
                <li>Conversion layout suggestions</li>
                <li>CRO suggestions</li>
                <li>4 revision rounds</li>
                <li>15 days post-delivery support</li>
              </ul>

              <button onClick={() => choosePlan('⭐ Professional Plan')} className="glass-btn mt-8 inline-flex">
                Choose professional
              </button>
            </article>

            <article className="glass-card glass-hover p-8">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">👑 Premium Pro Plan</p>
              <h2 className="mt-4 text-3xl font-bold text-slate-900">₹26,999</h2>
              <p className="mt-3 text-slate-600">The premium Shopify package for full store optimization, AI SEO, growth strategy, and scaling support.</p>

              <ul className="mt-6 space-y-3 text-slate-600">
                <li>Everything in Professional</li>
                <li>Premium homepage, product & collection experience</li>
                <li>Complete theme optimization</li>
                <li>Core Web Vitals recommendations</li>
                <li>AI SEO recommendations</li>
                <li>GEO SEO recommendations</li>
                <li>Rich snippet recommendations</li>
                <li>Store growth strategy</li>
                <li>Shopify scaling guidance</li>
                <li>Advanced conversion layout</li>
                <li>Custom growth recommendations</li>
                <li>6 revision rounds</li>
                <li>30 days post-delivery support</li>
              </ul>

              <button onClick={() => choosePlan('👑 Premium Pro Plan')} className="glass-btn mt-8 inline-flex">
                Choose premium
              </button>
            </article>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 section-spacing">
          <div className="glass-card p-8 lg:p-10">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Package comparison table</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">Compare service packages</h2>
            <p className="mt-4 text-slate-600">The table below summarizes the features and inclusions across all three service packages.</p>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="border-b border-slate-200 px-4 py-3">Feature / Service</th>
                    <th className="border-b border-slate-200 px-4 py-3">🚀 Starter</th>
                    <th className="border-b border-slate-200 px-4 py-3">⭐ Professional</th>
                    <th className="border-b border-slate-200 px-4 py-3">👑 Premium Pro</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600">
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-3">Price</td>
                    <td className="px-4 py-3">₹12,999</td>
                    <td className="px-4 py-3">₹19,999</td>
                    <td className="px-4 py-3">₹26,999</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <td className="px-4 py-3">Delivery Time</td>
                    <td className="px-4 py-3">7–10 Days</td>
                    <td className="px-4 py-3">14–20 Days</td>
                    <td className="px-4 py-3">28–32 Days</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-3">Homepage Design</td>
                    <td className="px-4 py-3">Basic</td>
                    <td className="px-4 py-3">Advanced</td>
                    <td className="px-4 py-3">Premium</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <td className="px-4 py-3">Collection Page</td>
                    <td className="px-4 py-3">✓</td>
                    <td className="px-4 py-3">✓</td>
                    <td className="px-4 py-3">✓</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-3">Product Page</td>
                    <td className="px-4 py-3">✓</td>
                    <td className="px-4 py-3">✓</td>
                    <td className="px-4 py-3">✓</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <td className="px-4 py-3">Theme Customization</td>
                    <td className="px-4 py-3">Basic</td>
                    <td className="px-4 py-3">Advanced</td>
                    <td className="px-4 py-3">Premium</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-3">Header & Footer Setup</td>
                    <td className="px-4 py-3">✓</td>
                    <td className="px-4 py-3">✓</td>
                    <td className="px-4 py-3">✓</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <td className="px-4 py-3">Navigation Setup</td>
                    <td className="px-4 py-3">✓</td>
                    <td className="px-4 py-3">✓</td>
                    <td className="px-4 py-3">✓</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-3">Mobile Responsive Design</td>
                    <td className="px-4 py-3">✓</td>
                    <td className="px-4 py-3">✓</td>
                    <td className="px-4 py-3">✓</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <td className="px-4 py-3">Speed Optimization</td>
                    <td className="px-4 py-3">Basic</td>
                    <td className="px-4 py-3">Advanced</td>
                    <td className="px-4 py-3">Premium</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-3">Image Optimization</td>
                    <td className="px-4 py-3">✓</td>
                    <td className="px-4 py-3">✓</td>
                    <td className="px-4 py-3">✓</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <td className="px-4 py-3">UX Improvements</td>
                    <td className="px-4 py-3">✓</td>
                    <td className="px-4 py-3">✓</td>
                    <td className="px-4 py-3">✓</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-3">SEO Guidance</td>
                    <td className="px-4 py-3">Basic</td>
                    <td className="px-4 py-3">Medium</td>
                    <td className="px-4 py-3">Advanced</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <td className="px-4 py-3">Schema Markup Guidance</td>
                    <td className="px-4 py-3">—</td>
                    <td className="px-4 py-3">✓</td>
                    <td className="px-4 py-3">✓</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-3">Internal Linking Strategy</td>
                    <td className="px-4 py-3">—</td>
                    <td className="px-4 py-3">✓</td>
                    <td className="px-4 py-3">✓</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <td className="px-4 py-3">AI SEO Recommendations</td>
                    <td className="px-4 py-3">—</td>
                    <td className="px-4 py-3">—</td>
                    <td className="px-4 py-3">✓</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-3">GEO SEO Recommendations</td>
                    <td className="px-4 py-3">—</td>
                    <td className="px-4 py-3">—</td>
                    <td className="px-4 py-3">✓</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <td className="px-4 py-3">Core Web Vitals Guidance</td>
                    <td className="px-4 py-3">—</td>
                    <td className="px-4 py-3">—</td>
                    <td className="px-4 py-3">✓</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-3">Rich Snippet Recommendations</td>
                    <td className="px-4 py-3">—</td>
                    <td className="px-4 py-3">—</td>
                    <td className="px-4 py-3">✓</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <td className="px-4 py-3">CRO Suggestions</td>
                    <td className="px-4 py-3">—</td>
                    <td className="px-4 py-3">✓</td>
                    <td className="px-4 py-3">✓</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-3">Customer Journey Improvements</td>
                    <td className="px-4 py-3">—</td>
                    <td className="px-4 py-3">✓</td>
                    <td className="px-4 py-3">✓</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <td className="px-4 py-3">Conversion Layout</td>
                    <td className="px-4 py-3">—</td>
                    <td className="px-4 py-3">✓</td>
                    <td className="px-4 py-3">✓</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-3">Store Growth Strategy</td>
                    <td className="px-4 py-3">—</td>
                    <td className="px-4 py-3">—</td>
                    <td className="px-4 py-3">✓</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <td className="px-4 py-3">Shopify Scaling Guidance</td>
                    <td className="px-4 py-3">—</td>
                    <td className="px-4 py-3">—</td>
                    <td className="px-4 py-3">✓</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="px-4 py-3">Revision Rounds</td>
                    <td className="px-4 py-3">2 Rounds</td>
                    <td className="px-4 py-3">4 Rounds</td>
                    <td className="px-4 py-3">6 Rounds</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <td className="px-4 py-3">Post-Delivery Support</td>
                    <td className="px-4 py-3">7 Days</td>
                    <td className="px-4 py-3">15 Days</td>
                    <td className="px-4 py-3">30 Days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 section-spacing">
          <div className="glass-card p-8 lg:p-10">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">How it works</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">From brief to launch</h2>
            <ol className="mt-6 space-y-4 text-slate-600 list-decimal pl-5">
              <li>Review your Shopify goals, products and brand direction.</li>
              <li>Confirm scope, timelines and payment milestones.</li>
              <li>Build and customise the theme, product pages and storefront flow.</li>
              <li>Review, refine and launch with final handover support.</li>
            </ol>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 section-spacing">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="glass-card p-8">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Automation & stock sync</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">Custom Shopify inventory automation</h2>
              <p className="mt-4 text-slate-600">A custom tool to keep stock and pricing in sync from SKU data without manual Shopify edits. Ideal for brands with fast-moving inventory.</p>

              <div className="mt-6 space-y-4 text-slate-600">
                <p><strong>Lifetime license:</strong> ₹49,999 one-time</p>
                <p><strong>Monthly plan:</strong> ₹4,999 / month</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>SKU-based stock updates</li>
                  <li>Automated price sync</li>
                  <li>Bulk product synchronization</li>
                  <li>Dashboard controls</li>
                  <li>Maintenance & support</li>
                </ul>
              </div>
            </div>

            <div className="glass-card p-8">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Client requirements</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">What I need from you</h2>
              <p className="mt-4 text-slate-600">To deliver the right Shopify outcome, I need complete project details and store access so work can begin without delay.</p>

              <ul className="mt-6 space-y-3 text-slate-600 list-disc pl-5">
                <li>Shopify admin access</li>
                <li>Product data, images and brand assets</li>
                <li>Company details and email</li>
                <li>Claude AI Pro if you want advanced SEO and content support</li>
                <li>ChatGPT Go for optional AI-powered collaboration</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 section-spacing">
          <div className="glass-card p-8 lg:p-10">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Payment terms</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">Project payment schedule</h2>
            <div className="mt-6 space-y-4 text-slate-600">
              <p>Projects are released in clear stages so you always know what to expect and when payment is due.</p>
              <ul className="list-disc pl-5 space-y-3">
                <li><strong>20%</strong> advance payment before work begins</li>
                <li><strong>50%</strong> once approximately half the project is completed</li>
                <li><strong>30%</strong> final payment before handover</li>
              </ul>
              <p>Long-term or recurring work can be moved to monthly billing if preferred.</p>
            </div>
          </div>
        </section>

        <section id="contact-form" className="mx-auto max-w-6xl px-4 section-spacing">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="glass-card p-8">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Let's talk</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">Share your requirements and preferred plan</h2>
              <p className="mt-4 text-slate-600">Use the form next to this section to send your request directly.</p>
              <div className="mt-6 space-y-4 text-slate-600">
                <p className="font-semibold text-slate-900">Need a custom quote?</p>
                <p>Tell me the package you are interested in and the Shopify features you need. I’ll reply with a detailed estimate and next steps.</p>
                <p className="font-semibold text-slate-900">Prefer direct email?</p>
                <button onClick={() => window.location.href = 'mailto:surendran.marketing@gmail.com'} className="glass-btn inline-flex items-center gap-2">
                  Email me directly <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <ContactForm selectedPlan={selectedPlan} />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pt-10 pb-20">
          <div className="glass-card glass-sheen p-10">
            <div className="space-y-6 text-slate-600">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Terms & conditions</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-900">Service agreement terms</h2>
                <p className="mt-4">This section constitutes the legally binding terms of this service agreement. By approving this proposal and making the advance payment, the client agrees to the following terms in full.</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="font-semibold text-slate-900">Project commencement</p>
                  <p className="mt-2 text-slate-600">Development begins only after written approval, receipt of the agreed advance payment, approval of project scope, receipt of all required materials, and confirmation of the project timeline by both parties.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Official communication</p>
                  <p className="mt-2 text-slate-600">Approvals, invoices, scope changes, and project decisions must be communicated through the registered email address. Messaging apps may be used for general discussions but are not official approvals.</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="font-semibold text-slate-900">Scope & pricing</p>
                  <p className="mt-2 text-slate-600">Pricing and timelines may be revised if additional features or scope changes are requested after approval. Change requests require written approval and may incur extra charges.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Project timelines</p>
                  <p className="mt-2 text-slate-600">All timelines are in business days (Monday–Friday, excluding public holidays) and begin once all required credentials, content, and assets are received. The developer is not liable for delays caused by client inaction.</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="font-semibold text-slate-900">Revision policy</p>
                  <p className="mt-2 text-slate-600">The client is entitled to the number of revision rounds specified in the selected package. Revision requests should be submitted in writing as a consolidated list. Additional requests are treated as change requests.</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Payment & refund policy</p>
                  <p className="mt-2 text-slate-600">Advance payments are strictly non-refundable once development has commenced. Mid-project and final payments are due per the agreed schedule. Late payments may affect delivery.</p>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-slate-700">
                <p className="font-semibold text-slate-900">Important policies</p>
                <ol className="mt-4 list-decimal space-y-3 pl-5 text-slate-600">
                  <li>If the client cancels the project after development begins, the advance payment is forfeited. Mid-project cancellations are non-refundable.</li>
                  <li>SEO services are guidance only. Search engine rankings are not guaranteed and depend on external factors, including algorithms, competition, and ongoing content efforts.</li>
                  <li>Third-party software licenses, premium themes, paid apps, hosting, domains, and external subscriptions are not included unless explicitly stated.</li>
                  <li>Upon final payment, the client receives ownership of custom-developed code, design assets, and deliverables produced for this project. The developer may showcase the work in a portfolio unless an NDA is signed.</li>
                  <li>Post-delivery support is limited to the duration in the selected package and covers issues arising directly from the developer's implementation. It does not cover third-party conflicts, client changes, or Shopify updates.</li>
                  <li>This agreement is governed by the laws of India, with disputes under the jurisdiction of courts in Chennai, Tamil Nadu.</li>
                </ol>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })} className="glass-btn">
                Email for a detailed quote
              </button>
              <button onClick={() => navigate('/')} className="glass-btn-ghost">
                Back to portfolio
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
