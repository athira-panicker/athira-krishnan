/**
 * js/career.js
 * Builds career timeline from career.json
 */

import { initReveal, fetchJSON, escHtml } from './utils.js';
import { buildNav } from '../components/nav.js';

document.addEventListener('DOMContentLoaded', async () => {
  await buildNav('site-nav');

  const [career, site] = await Promise.all([
    fetchJSON('../data/career.json'),
    fetchJSON('../data/site.json'),
  ]);

  buildPageHeader(site);
  buildTimeline(career);
  buildEducation(site);
  buildFooter(site);
  initReveal();
});

function buildPageHeader(site) {
  const el = document.getElementById('page-header');
  if (!el) return;
  el.innerHTML = `
    <div class="container">
      <div style="padding-top: calc(var(--nav-height) + var(--space-16)); padding-bottom: var(--space-12);">
        <p class="label reveal" style="margin-bottom:var(--space-3)">Experience</p>
        <h1 class="section-title reveal" style="font-size: clamp(var(--text-4xl), 6vw, var(--text-5xl)); margin-bottom:var(--space-4);">
          Career Journey
        </h1>
        <p class="reveal" style="color:var(--ink-muted); font-size:var(--text-lg); max-width:480px; font-weight:300;">
          From software engineer to global product lead — a path defined by shipping things that matter.
        </p>
        ${site ? `
        <div style="margin-top:var(--space-8); display:flex; gap:var(--space-4); flex-wrap:wrap;" class="reveal">
          <a href="mailto:${escHtml(site.email)}" class="btn btn-primary">Get in Touch</a>
          <a href="${escHtml(site.linkedin)}" target="_blank" rel="noopener" class="btn btn-secondary">View LinkedIn</a>
        </div>` : ''}
      </div>
    </div>
  `;
}

function buildTimeline(career) {
  const el = document.getElementById('career-timeline');
  if (!el || !career) return;

  el.innerHTML = `
    <div class="container">
      <div style="display:grid; grid-template-columns:1fr; gap:0;">
        <div style="max-width:720px;">
          <div class="timeline">
            ${career.map((item, i) => buildTimelineItem(item, i)).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function buildTimelineItem(item, index) {
  return `
    <div class="timeline-item${item.current ? ' current' : ''} reveal" data-delay="${index * 80}">
      <div class="timeline-dot"></div>
      <div class="timeline-period label">${escHtml(item.period)}</div>
      <div class="timeline-role">${escHtml(item.role)}</div>
      <div class="timeline-company">
        ${escHtml(item.company)} · ${escHtml(item.location)}
        <span class="timeline-type-badge">${escHtml(item.type)}</span>
        <span class="timeline-type-badge" style="background:var(--paper-cool)">${escHtml(item.domain)}</span>
      </div>
      <p style="font-size:var(--text-sm); color:var(--ink-muted); line-height:1.6; margin-bottom:var(--space-4); font-weight:300;">
        ${escHtml(item.summary)}
      </p>
      <div class="timeline-highlights">
        ${item.highlights.map(h => `
          <div class="timeline-highlight">${escHtml(h)}</div>
        `).join('')}
      </div>
    </div>
  `;
}

function buildEducation(site) {
  const el = document.getElementById('education-section');
  if (!el || !site?.education) return;

  el.innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <h2 class="section-title">Education</h2>
      </div>
      <div style="display:flex; flex-direction:column; gap:var(--space-4); max-width:720px;">
        ${site.education.map((e, i) => `
          <div class="edu-card reveal" data-delay="${i * 80}">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:var(--space-4);">
              <div>
                <div class="label" style="margin-bottom:var(--space-2)">${escHtml(e.school)}</div>
                <div style="font-family:var(--font-display); font-size:var(--text-xl); font-weight:600; color:var(--ink);">
                  ${escHtml(e.degree)}
                </div>
                ${e.gpa ? `<div style="font-family:var(--font-mono); font-size:var(--text-xs); color:var(--accent); margin-top:var(--space-2);">GPA: ${escHtml(e.gpa)}</div>` : ''}
              </div>
              <div class="chip">${escHtml(e.year)}</div>
            </div>
          </div>
        `).join('')}
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
