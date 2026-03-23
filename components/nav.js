/**
 * components/nav.js
 * Builds the site navigation from site.json data
 */

export async function buildNav(containerId = 'site-nav') {
  const site = await fetch('../data/site.json').then(r => r.json()).catch(() =>
    fetch('./data/site.json').then(r => r.json())
  );

  const nav = document.getElementById(containerId);
  if (!nav) return;

  // Determine base path (root vs pages/)
  const isSubpage = window.location.pathname.includes('/pages/');
  const base = isSubpage ? '../' : './';

  nav.innerHTML = `
    <div class="container">
      <div class="nav-inner">
        <a href="${base}index.html" class="nav-logo" aria-label="Home">
          ${site.name}
          <span>${site.title}</span>
        </a>

        <nav class="nav-links" aria-label="Main navigation">
          ${site.nav.map(item => buildNavItem(item, base)).join('')}
          <a href="${base}index.html#contact" class="nav-cta">Let's Talk</a>
        </nav>

        <button class="nav-hamburger" aria-label="Toggle menu" id="hamburger">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>

    <div class="nav-drawer" id="nav-drawer">
      ${site.nav.map(item => buildDrawerItem(item, base)).join('')}
      <a href="${base}index.html#contact" style="margin-top: auto; color: var(--accent) !important;">Let's Talk →</a>
    </div>
  `;

  initNavBehavior();
  highlightCurrentPage();
}

function buildNavItem(item, base) {
  if (!item.submenu) {
    return `
      <div class="nav-item">
        <a href="${resolveHref(item.href, base)}" class="nav-link">${item.label}</a>
      </div>
    `;
  }

  return `
    <div class="nav-item">
      <a href="${resolveHref(item.href, base)}" class="nav-link" aria-haspopup="true">
        ${item.label}
        <svg class="chevron" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
      <div class="nav-submenu" role="menu">
        ${item.submenu.map(sub => `
          <a href="${resolveHref(sub.href, base)}" role="menuitem">${sub.label}</a>
        `).join('')}
      </div>
    </div>
  `;
}

function buildDrawerItem(item, base) {
  if (!item.submenu) {
    return `<a href="${resolveHref(item.href, base)}">${item.label}</a>`;
  }
  return `
    <a href="${resolveHref(item.href, base)}">${item.label}</a>
    ${item.submenu.slice(1).map(sub =>
      `<a href="${resolveHref(sub.href, base)}" class="nav-drawer-sub">${sub.label}</a>`
    ).join('')}
  `;
}

function resolveHref(href, base) {
  if (href.startsWith('#')) return href;
  if (href.startsWith('http')) return href;
  // If it's a relative path starting with 'pages/'
  if (href.startsWith('pages/')) return base + href;
  return base + href;
}

function initNavBehavior() {
  // Scroll state
  const nav = document.getElementById('site-nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile hamburger
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('nav-drawer');
  if (hamburger && drawer) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      drawer.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close drawer on link click
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

function highlightCurrentPage() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkFile = href.split('/').pop().split('?')[0];
    const currentFile = path.split('/').pop();
    if (linkFile && linkFile === currentFile) {
      link.classList.add('active');
    }
  });
}
