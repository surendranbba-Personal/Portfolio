/* ------------------------------------------------------------------ *
 * CONTACT FORM — no-backend form delivery via Web3Forms. Submissions
 * are emailed straight to the owner; a hidden honeypot traps bots.
 * Create a key in 30 seconds at https://web3forms.com (enter the email
 * you want messages sent to) and paste it below.
 * ------------------------------------------------------------------ */

import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { Mail, ArrowRight, CheckCircle, X } from 'lucide-react';
import { Magnetic } from './motion';

const WEB3FORMS_ACCESS_KEY = 'dccf5a3f-01f5-4401-9a31-f372d2805ab1';

type ContactFormProps = {
  selectedPlan?: string;
};

export function ContactForm({ selectedPlan }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [subject, setSubject] = useState('');

  useEffect(() => {
    if (selectedPlan) {
      setSubject(`Inquiry: ${selectedPlan}`);
    }
  }, [selectedPlan]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        form.reset();
        setSubject('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const field =
    'w-full px-4 py-3 rounded-xl bg-white/70 border border-white/70 text-slate-700 ' +
    'placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 ' +
    'focus:border-transparent transition';

  return (
    <form onSubmit={onSubmit} className="glass-card p-6 md:p-8 text-left h-full">
      <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
        <Mail className="w-5 h-5 text-blue-600" /> Send a message
      </h3>

      {/* honeypot — hidden from real users, traps bots */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-name" className="block text-sm font-medium text-slate-600 mb-1.5">Name</label>
          <input id="cf-name" name="name" type="text" required autoComplete="name" placeholder="Your name" className={field} />
        </div>
        <div>
          <label htmlFor="cf-email" className="block text-sm font-medium text-slate-600 mb-1.5">Email</label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={field} />
        </div>
      </div>

      <input type="hidden" name="selected_plan" value={selectedPlan ?? ''} />
      {selectedPlan && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700 mb-4">
          <p className="font-semibold text-slate-900">Selected plan</p>
          <p className="mt-2 text-slate-600">{selectedPlan}</p>
        </div>
      )}
      <div className="mt-4">
        <label htmlFor="cf-subject" className="block text-sm font-medium text-slate-600 mb-1.5">Subject</label>
        <input
          id="cf-subject"
          name="subject"
          type="text"
          required
          placeholder="What is this about?"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          className={field}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="cf-message" className="block text-sm font-medium text-slate-600 mb-1.5">Message</label>
        <textarea id="cf-message" name="message" required rows={5} placeholder="Tell me a little about your project or role…" className={field} />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Magnetic>
          <button type="submit" disabled={status === 'sending'} className="glass-btn disabled:opacity-60 disabled:cursor-not-allowed">
            {status === 'sending' ? 'Sending…' : <>Send Message <ArrowRight className="w-4 h-4" /></>}
          </button>
        </Magnetic>
        {status === 'success' && (
          <span className="inline-flex items-center gap-2 text-emerald-600 font-medium">
            <CheckCircle className="w-5 h-5" /> Thank you — your message is on its way.
          </span>
        )}
        {status === 'error' && (
          <span className="inline-flex items-center gap-2 text-rose-600 font-medium">
            <X className="w-5 h-5" /> Something went wrong — please email me directly.
          </span>
        )}
      </div>
    </form>
  );
}
