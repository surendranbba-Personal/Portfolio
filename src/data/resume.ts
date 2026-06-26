/* ------------------------------------------------------------------ *
 * RESUME — builds a compact, single-page A4 HTML resume from the shared
 * content (src/data/content.ts) and lets the visitor save it as a PDF.
 *
 * "HTML while download, PDF on save": we render a self-contained HTML
 * document and trigger the browser's print dialog -> "Save as PDF".
 * Printing is triggered from THIS (parent) script — the page's CSP
 * blocks inline scripts, so the popup itself contains no <script>.
 * Every date / duration below is auto-calculated from the resume data.
 * ------------------------------------------------------------------ */

import {
  profile, experiences, projects, keyAchievements, skillGroups,
  education, certifications, languages,
  dateRange, fmtDuration, roleMonths, totalExperience,
} from './content';
import type { Role } from './content';

const esc = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const roleBlock = (r: Role): string => `
  <div class="item">
    <div class="item-head">
      <div>
        <span class="org">${esc(r.org)}</span>
        <span class="role">${esc(r.title)}</span>
      </div>
      <div class="dates">
        <span>${dateRange(r.start, r.end)}</span>
        <span class="dur">${fmtDuration(roleMonths(r))}${r.end ? '' : ' · Ongoing'}</span>
      </div>
    </div>
    <ul>${r.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
  </div>`;

export function buildResumeHtml(screen = false): string {
  // On-screen view (the resume modal) hides the print-hint bar; the download
  // path keeps it so visitors know the print dialog is about to open.
  const bar = screen
    ? ''
    : `<div class="bar">Your browser's print dialog will open — choose <b>"Save as PDF"</b> as the destination.</div>`;
  const skills = skillGroups
    .map(
      (g) => `
      <div class="skill-row">
        <span class="skill-label">${esc(g.label)}</span>
        <span class="skill-pills">${g.items.map((i) => `<span class="pill">${esc(i)}</span>`).join('')}</span>
      </div>`
    )
    .join('');

  const eduBlock = education
    .map(
      (e) => `
      <div class="edu">
        <div><strong>${esc(e.degree)}</strong><div class="muted">${esc(e.school)}</div></div>
        <span class="yr">${esc(e.start)} – ${esc(e.end)}</span>
      </div>`
    )
    .join('');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Surendran M - Resume</title>
<style>
  @page { size: A4; margin: 9mm 11mm; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    color: #334155; font-size: 9pt; line-height: 1.34;
    background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  .sheet { max-width: 800px; margin: 0 auto; padding: 16px 22px; }

  .bar {
    position: sticky; top: 0; background: #0f172a; color: #fff;
    padding: 10px 16px; font-size: 12.5px; text-align: center;
  }
  .bar b { color: #93c5fd; }
  @media print { .bar { display: none; } .sheet { padding: 0; max-width: none; } }

  header { border-bottom: 2px solid #2563eb; padding-bottom: 9px; margin-bottom: 11px; }
  .name { font-size: 20pt; font-weight: 700; color: #0f172a; letter-spacing: -0.3px; line-height: 1.1; }
  .title { font-size: 10.5pt; color: #2563eb; font-weight: 600; margin-top: 1px; }
  .contact { margin-top: 6px; font-size: 8.4pt; color: #475569; }
  .contact span { white-space: nowrap; }
  .contact span + span::before { content: '•'; margin: 0 6px; color: #cbd5e1; }
  .meta { margin-top: 3px; font-size: 8.2pt; color: #64748b; }
  .meta b { color: #0f172a; }

  section { margin-top: 10px; }
  h2 {
    font-size: 9pt; text-transform: uppercase; letter-spacing: 1.2px;
    color: #2563eb; font-weight: 700; margin: 0 0 6px;
    border-bottom: 1px solid #e2e8f0; padding-bottom: 3px;
  }
  p.summary { margin: 0; color: #475569; font-size: 8.8pt; }

  .item { margin-bottom: 7px; page-break-inside: avoid; }
  .item-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
  .org { font-weight: 700; color: #0f172a; font-size: 9.6pt; }
  .role { color: #2563eb; font-weight: 600; }
  .role::before { content: '— '; color: #94a3b8; }
  .dates { text-align: right; white-space: nowrap; font-size: 8.2pt; color: #475569; }
  .dates .dur { display: block; color: #94a3b8; font-size: 7.6pt; }
  ul { margin: 3px 0 0; padding-left: 15px; }
  li { margin: 1px 0; color: #475569; }

  .skill-row { display: flex; gap: 10px; margin-bottom: 4px; align-items: baseline; }
  .skill-label { flex: 0 0 118px; font-weight: 600; color: #0f172a; font-size: 8.6pt; }
  .skill-pills { display: flex; flex-wrap: wrap; gap: 5px; }
  .pill {
    display: inline-block; padding: 1.5px 7px; border: 1px solid #dbe4f3;
    border-radius: 20px; font-size: 7.8pt; color: #1e3a8a; background: #f5f8ff;
  }

  .cols { display: flex; gap: 22px; }
  .cols > div { flex: 1; }
  .edu { display: flex; justify-content: space-between; gap: 10px; margin-bottom: 6px; }
  .edu .yr { white-space: nowrap; color: #475569; font-size: 8.2pt; }
  .muted { color: #64748b; font-size: 8.2pt; }
  .clean { list-style: none; padding: 0; margin: 0; }
  .clean li { margin: 2px 0; }
  .lang { display: flex; justify-content: space-between; }
  .lang .lvl { color: #94a3b8; }
</style>
</head>
<body>
  ${bar}
  <div class="sheet">
    <header>
      <div class="name">${esc(profile.name)}</div>
      <div class="title">${esc(profile.title)}</div>
      <div class="contact">
        <span>${esc(profile.phone)}</span>
        <span>${esc(profile.email)}</span>
        <span>${esc(profile.linkedinLabel)}</span>
        <span>${esc(profile.location)}</span>
      </div>
      <div class="meta">
        <b>Total Experience:</b> ${totalExperience} &nbsp;·&nbsp; <b>Availability:</b> ${esc(profile.availability)}
      </div>
    </header>

    <section>
      <h2>Professional Summary</h2>
      <p class="summary">${esc(profile.summary)}</p>
    </section>

    <section>
      <h2>Core Skills</h2>
      ${skills}
    </section>

    <section>
      <h2>Professional Experience</h2>
      ${experiences.map(roleBlock).join('')}
    </section>

    <section>
      <h2>Projects &amp; Achievements</h2>
      ${projects.map(roleBlock).join('')}
      <div class="item">
        <div class="org">Key Achievements</div>
        <ul>${keyAchievements.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>
      </div>
    </section>

    <section>
      <h2>Education, Certifications &amp; Languages</h2>
      <div class="cols">
        <div>${eduBlock}</div>
        <div>
          <div class="muted" style="font-weight:600;color:#0f172a;margin-bottom:3px;">Certifications</div>
          <ul class="clean">${certifications.map((c) => `<li>• ${esc(c)}</li>`).join('')}</ul>
          <div class="muted" style="font-weight:600;color:#0f172a;margin:6px 0 3px;">Languages</div>
          <ul class="clean">${languages
            .map((l) => `<li class="lang"><span>${esc(l.name)}</span><span class="lvl">${esc(l.level)}</span></li>`)
            .join('')}</ul>
        </div>
      </div>
    </section>
  </div>
</body>
</html>`;
}

/** Open the resume in a new tab and trigger "Save as PDF". */
export function downloadResume(): void {
  const w = window.open('', '_blank');
  if (!w) {
    alert('Please allow pop-ups so the resume can open and be saved as a PDF.');
    return;
  }
  w.document.open();
  w.document.write(buildResumeHtml());
  w.document.close();
  w.focus();
  // CSP-safe: triggered from the parent, the popup contains no scripts.
  setTimeout(() => w.print(), 600);
}
