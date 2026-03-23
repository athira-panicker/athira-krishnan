/**
 * js/about.js
 * Builds about page from site.json
 */

import { initReveal, fetchJSON, escHtml } from './utils.js';
import { buildNav } from '../components/nav.js';

document.addEventListener('DOMContentLoaded', async () => {
  await buildNav('site-nav');

  const site = await fetchJSON('../data/site.json');

  buildAbout(site);
  buildSkillsDeep(site);
  buildContact(site);
  buildFooter(site);
  initReveal();
});

function buildAbout(site) {
  const el = document.getElementById('about-content');
  if (!el || !site) return;

  el.innerHTML = `
    <div class="container">
      <div class="about-grid">
        <div class="about-text">
          <p class="label reveal" style="margin-bottom:var(--space-3)">About</p>
          <h1 class="about-name reveal">${escHtml(site.name)}</h1>
          <p class="about-title-line reveal">${escHtml(site.title)} · ${escHtml(site.location)}</p>

          <div class="about-body reveal">
            <p>
              I'm a product manager who believes that great products aren't built from
              spreadsheets alone. They're born from conversations with real users, messy
              experimentation, and the discipline to throw away what doesn't work.
            </p>
            <p>
              My career has taken me from writing ELT pipelines in C# at a global rail
              company to identifying $120M market opportunities at an early-stage startup.
              What ties it together: I care about the <em>why</em> as much as the <em>what</em>.
            </p>
            <p>
              At Northwestern, I pursued a Master's in Engineering Management — graduating
              with a 4.0. But the education I'm most proud of happened in sprint retros,
              user interviews, and investor pitch rooms.
            </p>
            <p>
              Outside work: I think a lot about AI agents, write about product craft,
              and make an unreasonable amount of tea.
            </p>
          </div>

          <div class="about-links reveal">
            <a href="mailto:${escHtml(site.email)}" class="btn btn-primary">Email Me</a>
            <a href="${escHtml(site.linkedin)}" target="_blank" rel="noopener" class="btn btn-secondary">LinkedIn →</a>
          </div>
        </div>

        <aside class="about-sidebar">
          <div class="about-info-card reveal">
            <div class="info-row">
              <span class="label">Location</span>
              <span>${escHtml(site.location)}</span>
            </div>
            <div class="info-row">
              <span class="label">Email</span>
              <a href="mailto:${escHtml(site.email)}" style="color:var(--accent)">${escHtml(site.email)}</a>
            </div>
            <div class="info-row">
              <span class="label">Phone</span>
              <span>${escHtml(site.phone)}</span>
            </div>
            <div class="info-row">
              <span class="label">Education</span>
              <span>MS, Northwestern · 4.0 GPA</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  `;
}

function buildSkillsDeep(site) {
  const el = document.getElementById('skills-deep');
  if (!el || !site) return;

  el.innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <h2 class="section-title">Skills & Tools</h2>
      </div>
      <div class="skills-grid">
        ${Object.entries(site.skills).map(([group, skills], i) => `
          <div class="skill-group reveal" data-delay="${i * 80}">
            <div class="skill-group-title">${escHtml(group)}</div>
            <ul class="skill-list">
              ${skills.map(s => `<li>${escHtml(s)}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function buildContact(site) {
  const el = document.getElementById('contact');
  if (!el || !site) return;
  el.innerHTML = `
    <div class="container">
      <div style="max-width:600px">
        <p class="label" style="color:rgba(247,244,239,0.4); margin-bottom:var(--space-4)">Get in touch</p>
        <h2 style="font-family:var(--font-display); font-size:clamp(var(--text-3xl),5vw,var(--text-4xl)); font-weight:400; line-height:1.1; letter-spacing:-0.03em; color:var(--paper); margin-bottom:var(--space-8);" class="reveal">
          Let's build something <em style="font-style:italic; color:var(--accent)">worth shipping.</em>
        </h2>
        <div style="display:flex; flex-wrap:wrap; gap:var(--space-4); align-items:center;" class="reveal">
          <a href="mailto:${escHtml(site.email)}" class="btn btn-accent">${escHtml(site.email)}</a>
          <a href="${escHtml(site.linkedin)}" class="contact-link" target="_blank" rel="noopener">LinkedIn →</a>
        </div>
      </div>
    </div>
  `;
}

function buildFooter(site) {
  const el = document.getElementById('site-footer');
  if (!el || !site) return;
  el.innerHTML = `
    <div class="container">
      <div class="footer-inner">
        <span class="footer-copy">© ${new Date().getFullYear()} ${escHtml(site.name)}</span>
        <div class="footer-links">
          <a href="projects.html">Work</a>
          <a href="blog.html">Blog</a>
          <a href="career.html">Career</a>
          <a href="about.html">About</a>
        </div>
      </div>
    </div>
  `;
}
