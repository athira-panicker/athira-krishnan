/**
 * js/blog.js
 * Builds blog listing + single post view from blog.json
 */

import { initReveal, fetchJSON, escHtml, formatDate, formatDateShort } from './utils.js';
import { buildNav } from '../components/nav.js';

document.addEventListener('DOMContentLoaded', async () => {
  await buildNav('site-nav');

  const [blog, site] = await Promise.all([
    fetchJSON('../data/blog.json'),
    fetchJSON('../data/site.json'),
  ]);

  buildPageHeader();
  buildBlogListing(blog, site);
  buildFooter(site);
  initReveal();

  // Check URL params for pre-filtering
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat');
  if (cat) {
    const tab = document.querySelector(`[data-cat="${cat}"]`);
    if (tab) tab.click();
  }
});

function buildPageHeader() {
  const el = document.getElementById('page-header');
  if (!el) return;
  el.innerHTML = `
    <div class="container">
      <div style="padding-top: calc(var(--nav-height) + var(--space-16)); padding-bottom: var(--space-12);">
        <p class="label reveal" style="margin-bottom:var(--space-3)">Writing</p>
        <h1 class="section-title reveal" style="font-size: clamp(var(--text-4xl), 6vw, var(--text-5xl)); margin-bottom:var(--space-4);">
          Product Notes
        </h1>
        <p class="reveal" style="color:var(--ink-muted); font-size:var(--text-lg); max-width:480px; font-weight:300;">
          Thinking out loud on strategy, experimentation, AI, and what it means to build products people actually use.
        </p>
      </div>
    </div>
  `;
}

function buildBlogListing(posts, site) {
  const el = document.getElementById('blog-listing');
  if (!el || !posts) return;

  // Build categories
  const cats = ['All', ...new Set(posts.map(p => p.category))];

  el.innerHTML = `
    <div class="container">
      <div class="filter-tabs reveal">
        ${cats.map((c, i) => `
          <button class="filter-tab${i === 0 ? ' active' : ''}" data-cat="${c === 'All' ? 'all' : escHtml(c)}">
            ${escHtml(c)}
          </button>
        `).join('')}
      </div>

      <div class="blog-full-grid" id="blog-items">
        ${posts.map((p, i) => buildBlogCard(p, i)).join('')}
      </div>
    </div>
  `;

  // Filter behavior
  const tabs = el.querySelectorAll('.filter-tab');
  const items = el.querySelectorAll('.blog-full-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.cat;
      items.forEach(item => {
        const match = cat === 'all' || item.dataset.cat === cat;
        item.style.display = match ? '' : 'none';
      });
    });
  });
}

function buildBlogCard(post, index) {
  return `
    <article class="blog-full-card reveal" data-cat="${escHtml(post.category)}" data-delay="${(index % 4) * 80}"
             onclick="openPost('${escHtml(post.id)}')" style="cursor:pointer">
      <div class="blog-full-meta">
        <span class="blog-cat">${escHtml(post.category)}</span>
        <span style="color:var(--rule)">·</span>
        <span class="blog-date">${formatDateShort(post.date)}</span>
        <span style="color:var(--rule)">·</span>
        <span class="blog-read-time">${escHtml(post.readTime)} read</span>
      </div>
      <h2 class="blog-full-title">${escHtml(post.title)}</h2>
      <p class="blog-full-excerpt">${escHtml(post.excerpt)}</p>
      <div class="blog-full-tags">
        ${post.tags.map(t => `<span class="chip">${escHtml(t)}</span>`).join('')}
      </div>
      <span class="blog-read-more">Read more →</span>
    </article>
  `;
}

// Open post modal
window.openPost = async function(id) {
  const posts = await fetchJSON('../data/blog.json');
  const post = posts?.find(p => p.id === id);
  if (!post) return;

  const modal = document.getElementById('post-modal');
  const content = document.getElementById('post-content');
  if (!modal || !content) return;

  // Try to fetch markdown content
  let body = '';
  try {
    const mdRes = await fetch(`../data/${post.content}`);
    if (mdRes.ok) {
      const md = await mdRes.text();
      body = simpleMarkdown(md);
    }
  } catch (e) {}

  if (!body) {
    body = `<p>${escHtml(post.excerpt)}</p><p style="color:var(--ink-muted);margin-top:2rem">Full article coming soon.</p>`;
  }

  content.innerHTML = `
    <div class="post-meta">
      <a href="" onclick="closePost(event)" class="post-back">← Back</a>
      <span class="blog-cat">${escHtml(post.category)}</span>
      <span class="blog-date">${formatDate(post.date)}</span>
      <span class="blog-read-time">${escHtml(post.readTime)} read</span>
    </div>
    <h1 class="post-title">${escHtml(post.title)}</h1>
    <div class="post-tags" style="margin-bottom:var(--space-10)">
      ${post.tags.map(t => `<span class="chip">${escHtml(t)}</span>`).join('')}
    </div>
    <div class="post-body">${body}</div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  window.history.pushState({}, '', `?post=${id}`);
};

window.closePost = function(e) {
  if (e) e.preventDefault();
  const modal = document.getElementById('post-modal');
  modal?.classList.remove('open');
  document.body.style.overflow = '';
  window.history.pushState({}, '', window.location.pathname);
};

// Simple markdown → HTML (subset)
function simpleMarkdown(md) {
  return md
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$3</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/^---$/gm, '<hr>')
    .replace(/^\- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hul]|<hr|<\/p|<p)(.+)$/gm, '$1')
    .replace(/^(.+)$/gm, (m) => m.startsWith('<') ? m : `<p>${m}</p>`)
    .replace(/<p><\/p>/g, '');
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
          <a href="${escHtml(site.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>
        </div>
      </div>
    </div>
  `;
}
