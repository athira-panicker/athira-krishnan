/**
 * js/utils.js
 * Shared utility functions
 */

// ── Intersection Observer for scroll reveals ──────────────

export function initReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger children if the element has [data-stagger]
          const delay = entry.target.dataset.delay || 0;
          entry.target.style.transitionDelay = delay + 'ms';
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el, i) => {
    if (el.dataset.stagger !== undefined) {
      el.style.transitionDelay = (i * 80) + 'ms';
    }
    io.observe(el);
  });
}

// ── Date formatting ───────────────────────────────────────

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function formatDateShort(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
}

// ── Fetch JSON helper ─────────────────────────────────────

export async function fetchJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to fetch ${path}`);
    return await res.json();
  } catch (e) {
    console.warn('fetchJSON error:', e);
    return null;
  }
}

// ── Filter list items ─────────────────────────────────────

export function initFilters(tabSelector, itemSelector, getCategory) {
  const tabs = document.querySelectorAll(tabSelector);
  const items = document.querySelectorAll(itemSelector);

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.cat;
      items.forEach(item => {
        const match = cat === 'all' || getCategory(item) === cat;
        item.style.display = match ? '' : 'none';
      });
    });
  });
}

// ── Escape HTML ───────────────────────────────────────────

export function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Throttle ──────────────────────────────────────────────

export function throttle(fn, delay) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= delay) { last = now; fn(...args); }
  };
}
