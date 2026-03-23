/**
 * js/home.js
 * Builds homepage sections from JSON data
 */

import { initReveal, fetchJSON, escHtml, formatDateShort } from './utils.js';
import { buildNav } from '../components/nav.js';

document.addEventListener('DOMContentLoaded', async () => {
  await buildNav('site-nav');

  const [projects, blog, career, site] = await Promise.all([
    fetchJSON('./data/projects.json'),
    fetchJSON('./data/blog.json'),
    fetchJSON('./data/career.json'),
    fetchJSON('./data/site.json'),
  ]);

  if (site) buildHero(site, career);
  buildMarquee(site);
  if (projects) buildProjectsSection(projects.filter(p => p.featured));
  if (blog) buildBlogSection(blog.filter(b => b.featured));
  if (site) buildSkillsSection(site);
  buildContact(site);
  buildFooter(site);

  initReveal();
});

// ── HERO ──────────────────────────────────────────────────

function buildHero(site, career) {
  const current = career?.find(c => c.current);
  const el = document.getElementById('hero');
  if (!el) return;

  el.innerHTML = `
    <div class="container">
      <div class="hero-inner">
        <div class="hero-content animate-fade-up">
          <div class="hero-eyebrow">
            <div class="hero-eyebrow-dot"></div>
            <span class="label">Product Manager · Chicago, IL</span>
          </div>

          <h1 class="hero-title">
            I build products<br>that <em>move markets.</em>
          </h1>

          <p class="hero-desc">
            5+ years delivering end-to-end product strategy across enterprise,
            B2B, and B2C. I turn user research and market signals into
            measurable growth.
          </p>

          <div class="hero-actions">
            <a href="pages/projects.html" class="btn btn-primary">View My Work →</a>
            <a href="pages/blog.html" class="btn btn-secondary">Read the Blog</a>
          </div>

          <div class="hero-stats">
            <div class="hero-stat">
              <div class="hero-stat-value">5+</div>
              <div class="hero-stat-label">Years of PM</div>
            </div>
            <div class="hero-stat">
              <div class="hero-stat-value">3</div>
              <div class="hero-stat-label">Global Markets</div>
            </div>
            <div class="hero-stat">
              <div class="hero-stat-value">4.0</div>
              <div class="hero-stat-label">Northwestern GPA</div>
            </div>
          </div>
        </div>

        <div class="hero-card animate-fade-up" style="animation-delay:200ms">
          <div class="hero-card-name">${escHtml(site.name)}</div>
          <div class="hero-card-role">${escHtml(site.title)}</div>

          <div class="hero-card-chips">
            <span class="chip chip-filled">Product Strategy</span>
            <span class="chip chip-accent">A/B Testing</span>
            <span class="chip">GTM</span>
            <span class="chip">AI/LLMs</span>
            <span class="chip">Agile</span>
            <span class="chip">SQL</span>
            <span class="chip">Figma</span>
          </div>

          ${current ? `
          <div class="hero-card-currently">
            <div class="status-dot"></div>
            <span>Currently ${escHtml(current.role)} @ ${escHtml(current.company)}</span>
          </div>` : ''}
        </div>
      </div>
    </div>
  `;
}

// ── MARQUEE ───────────────────────────────────────────────

function buildMarquee(site) {
  const el = document.getElementById('marquee');
  if (!el) return;
  const items = ['Product Strategy', 'A/B Testing', 'GTM', 'LLM Integration', 'Market Sizing', 'Agile', 'SQL', 'Tableau', 'Figma', 'Backlog Prioritization', 'VoC', 'JTBD'];
  const doubled = [...items, ...items];
  el.innerHTML = `
    <div class="marquee-track">
      ${doubled.map(i => `<span class="marquee-item">${escHtml(i)}</span>`).join('')}
    </div>
  `;
}

// ── PROJECTS ──────────────────────────────────────────────

function buildProjectsSection(projects) {
  const el = document.getElementById('projects-section');
  if (!el) return;

  el.innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <h2 class="section-title">Selected Work</h2>
        <a href="pages/projects.html" class="section-link">All projects →</a>
      </div>
      <div class="projects-grid">
        ${projects.map((p, i) => `
          <div class="project-card reveal" data-delay="${i * 100}" onclick="window.location='pages/projects.html#${p.id}'">
            <div class="project-header">
              <div>
                <div class="project-company label">${escHtml(p.company)}</div>
              </div>
              <div class="project-year label">${escHtml(p.year)}</div>
            </div>
            <div>
              <div class="chip" style="margin-bottom:var(--space-3)">${escHtml(p.category)}</div>
              <h3 class="project-title">${escHtml(p.title)}</h3>
            </div>
            <p class="project-desc">${escHtml(p.description)}</p>
            <div class="project-metrics">
              ${p.metrics.map(m => `
                <div>
                  <div class="metric-value">${escHtml(m.value)}</div>
                  <div class="metric-label">${escHtml(m.label)}</div>
                </div>
              `).join('')}
            </div>
            <div class="project-tags">
              ${p.tags.map(t => `<span class="chip">${escHtml(t)}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ── BLOG ──────────────────────────────────────────────────

function buildBlogSection(posts) {
  const el = document.getElementById('blog-section');
  if (!el) return;

  el.innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <h2 class="section-title">From the Blog</h2>
        <a href="pages/blog.html" class="section-link">All posts →</a>
      </div>
      <div class="blog-grid">
        ${posts.map((p, i) => `
          <article class="blog-card reveal" data-delay="${i * 100}" onclick="window.location='pages/blog.html#${p.id}'">
            <div class="blog-meta">
              <span class="blog-cat">${escHtml(p.category)}</span>
              <span class="blog-date">${formatDateShort(p.date)}</span>
              <span class="blog-read-time">${escHtml(p.readTime)} read</span>
            </div>
            <h3 class="blog-title">${escHtml(p.title)}</h3>
            <p class="blog-excerpt">${escHtml(p.excerpt)}</p>
            <span class="blog-read-more">Read more →</span>
          </article>
        `).join('')}
      </div>
    </div>
  `;
}

// ── SKILLS ────────────────────────────────────────────────

function buildSkillsSection(site) {
  const el = document.getElementById('skills-section');
  if (!el) return;

  el.innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <h2 class="section-title">Toolkit</h2>
        <a href="pages/about.html" class="section-link">About me →</a>
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

// ── CONTACT ───────────────────────────────────────────────

function buildContact(site) {
  const el = document.getElementById('contact');
  if (!el || !site) return;

  el.innerHTML = `
    <div class="container">
      <div style="max-width:600px">
        <p class="label" style="color:rgba(247,244,239,0.4); margin-bottom:var(--space-4)">Get in touch</p>
        <h2 class="contact-title reveal">
          Let's build something <em>worth shipping.</em>
        </h2>
        <div class="contact-links reveal">
          <a href="mailto:${escHtml(site.email)}" class="contact-link btn btn-accent">
            ${escHtml(site.email)}
          </a>
          <a href="${escHtml(site.linkedin)}" class="contact-link" target="_blank" rel="noopener">
            LinkedIn →
          </a>
        </div>
      </div>
    </div>
  `;
}

// ── FOOTER ────────────────────────────────────────────────

function buildFooter(site) {
  const el = document.getElementById('site-footer');
  if (!el || !site) return;

  el.innerHTML = `
    <div class="container">
      <div class="footer-inner">
        <span class="footer-copy">© ${new Date().getFullYear()} ${escHtml(site.name)}</span>
        <div class="footer-links">
          <a href="pages/projects.html">Work</a>
          <a href="pages/blog.html">Blog</a>
          <a href="pages/career.html">Career</a>
          <a href="pages/about.html">About</a>
          <a href="${escHtml(site.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>
        </div>
      </div>
    </div>
  `;
}
