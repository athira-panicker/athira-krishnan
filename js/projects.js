/**
 * js/projects.js
 * Builds projects listing from projects.json
 */

import { initReveal, fetchJSON, escHtml } from './utils.js';
import { buildNav } from '../components/nav.js';

document.addEventListener('DOMContentLoaded', async () => {
  await buildNav('site-nav');

  const [projects, site] = await Promise.all([
    fetchJSON('../data/projects.json'),
    fetchJSON('../data/site.json'),
  ]);

  buildPageHeader();
  buildProjectsGrid(projects);
  buildFooter(site);
  initReveal();

  // Hash scroll
  if (window.location.hash) {
    setTimeout(() => {
      const el = document.querySelector(window.location.hash);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  }
});

function buildPageHeader() {
  const el = document.getElementById('page-header');
  if (!el) return;
  el.innerHTML = `
    <div class="container">
      <div style="padding-top: calc(var(--nav-height) + var(--space-16)); padding-bottom: var(--space-12);">
        <p class="label reveal" style="margin-bottom:var(--space-3)">Portfolio</p>
        <h1 class="section-title reveal" style="font-size: clamp(var(--text-4xl), 6vw, var(--text-5xl)); margin-bottom:var(--space-4);">
          Selected Work
        </h1>
        <p class="reveal" style="color:var(--ink-muted); font-size:var(--text-lg); max-width:480px; font-weight:300;">
          End-to-end product stories — from research and strategy to launch and impact.
        </p>
      </div>
    </div>
  `;
}

function buildProjectsGrid(projects) {
  const el = document.getElementById('projects-grid');
  if (!el || !projects) return;

  el.innerHTML = `
    <div class="container">
      <div class="projects-full-grid">
        ${projects.map((p, i) => buildProjectCard(p, i)).join('')}
      </div>
    </div>
  `;
}

function buildProjectCard(p, index) {
  return `
    <article class="project-full-card reveal" id="${escHtml(p.id)}" data-delay="${(index % 2) * 100}">
      <div class="project-full-header">
        <div>
          <div class="project-company label">${escHtml(p.company)}</div>
          <h2 class="project-full-title">${escHtml(p.title)}</h2>
          <div style="display:flex; gap:var(--space-2); margin-top:var(--space-3); flex-wrap:wrap;">
            <span class="chip chip-filled">${escHtml(p.category)}</span>
            <span class="chip">${escHtml(p.year)}</span>
          </div>
        </div>
        <div class="project-full-metrics">
          ${p.metrics.map(m => `
            <div class="metric-block">
              <div class="metric-value">${escHtml(m.value)}</div>
              <div class="metric-label">${escHtml(m.label)}</div>
            </div>
          `).join('')}
        </div>
      </div>
      <p class="project-full-desc">${escHtml(p.description)}</p>
      <div class="project-tags">
        ${p.tags.map(t => `<span class="chip">${escHtml(t)}</span>`).join('')}
      </div>
    </article>
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
