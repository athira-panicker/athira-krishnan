# Athira Unnikrishnan — Portfolio Website

A clean, modular portfolio website built with vanilla HTML, CSS, and JavaScript. No frameworks, no build tools required. Fully static — deploy anywhere.

---

## 📁 Folder Structure

```
athira-portfolio/
├── index.html              ← Homepage
├── 404.html                ← 404 page
│
├── pages/
│   ├── blog.html           ← Blog listing + post reader
│   ├── projects.html       ← Project portfolio
│   ├── career.html         ← Career timeline
│   └── about.html          ← About page
│
├── css/
│   ├── tokens.css          ← Design tokens (colors, fonts, spacing)
│   ├── base.css            ← Reset and global styles
│   ├── nav.css             ← Navigation component styles
│   ├── sections.css        ← Shared section styles (hero, cards, buttons…)
│   ├── blog.css            ← Blog-specific styles
│   ├── projects.css        ← Projects-specific styles
│   ├── career.css          ← Career-specific styles
│   └── about.css           ← About-specific styles
│
├── js/
│   ├── utils.js            ← Shared utilities (reveal, fetch, format…)
│   ├── home.js             ← Homepage builder
│   ├── blog.js             ← Blog page builder
│   ├── projects.js         ← Projects page builder
│   ├── career.js           ← Career page builder
│   └── about.js            ← About page builder
│
├── components/
│   └── nav.js              ← Navigation component (shared across all pages)
│
├── data/
│   ├── site.json           ← ⭐ Global config: name, bio, nav, skills, socials
│   ├── projects.json       ← ⭐ Project entries
│   ├── career.json         ← ⭐ Career timeline entries
│   ├── blog.json           ← ⭐ Blog post metadata
│   └── blog/               ← Blog post body content (Markdown files)
│       ├── ai-agents-product-management.md
│       ├── ab-testing-game-mechanics.md
│       └── ...
│
└── assets/
    └── icons/
        └── favicon.svg
```

---

## ✏️ How to Edit Content

### Update Personal Info
Edit `data/site.json` — name, title, bio, email, LinkedIn, skills, and nav items all live here.

### Add a Project
Open `data/projects.json` and add an entry:
```json
{
  "id": "my-project",
  "title": "Project Title",
  "company": "Company Name",
  "category": "B2B · SaaS",
  "year": "2025",
  "description": "What you built and why it mattered.",
  "tags": ["Tag1", "Tag2"],
  "metrics": [
    { "value": "3x", "label": "Growth" },
    { "value": "50%", "label": "Cost Saved" },
    { "value": "5", "label": "Markets" }
  ],
  "featured": true,
  "color": "#f5f0e8"
}
```

### Add a Career Entry
Open `data/career.json` and add:
```json
{
  "id": "company-slug",
  "role": "Senior Product Manager",
  "company": "Acme Corp",
  "location": "Remote",
  "period": "Jan 2026 – Present",
  "type": "Full-Time",
  "domain": "B2C · FinTech",
  "summary": "One-sentence summary.",
  "highlights": [
    "First highlight",
    "Second highlight"
  ],
  "current": true
}
```

### Write a Blog Post

1. Add metadata to `data/blog.json`:
```json
{
  "id": "my-post-slug",
  "title": "My Post Title",
  "slug": "my-post-slug",
  "category": "Strategy",
  "subcategory": "Go-To-Market",
  "date": "2026-03-01",
  "readTime": "5 min",
  "excerpt": "Short description shown in listing.",
  "featured": false,
  "tags": ["Tag1", "Tag2"],
  "content": "blog/my-post-slug.md"
}
```

2. Create `data/blog/my-post-slug.md` with your Markdown content.

Supported Markdown: `# ## ###` headings, `**bold**`, `*italic*`, `` `code` ``, `- list items`, `---` horizontal rules, paragraphs.

### Add Blog Submenu Categories
Edit the `nav` array in `data/site.json` — the `submenu` on the Product nav item controls the dropdown links.

---

## 🚀 Deployment

### Local Development
Since this uses ES modules, you need a local server (not just opening the file):

```bash
# Option 1: Python
python3 -m http.server 8080

# Option 2: Node (npx)
npx serve .

# Option 3: VS Code Live Server extension
```

Then visit: `http://localhost:8080`

### GitHub Pages
1. Push this folder to a GitHub repo
2. Go to Settings → Pages → Source: Deploy from branch → `main` / `root`
3. Your site will be at `https://yourusername.github.io/repo-name/`

**Note for GitHub Pages:** If your repo is not at root, update all hrefs in `data/site.json` to include your repo base path, or use a custom domain.

### Netlify
1. Drag the `athira-portfolio` folder into [netlify.com/drop](https://netlify.com/drop)
2. Done — no config needed.

### Vercel
```bash
npx vercel
```

---

## 🎨 Customizing the Design

All design tokens (colors, fonts, spacing) live in `css/tokens.css`. Key variables:

```css
--ink          /* Primary text color */
--paper        /* Background color */
--accent       /* Highlight / accent color (currently #c8553d) */
--font-display /* Heading font (currently Playfair Display) */
--font-body    /* Body font (currently DM Sans) */
--font-mono    /* Monospace font (currently DM Mono) */
```

Change the accent color, swap fonts, or adjust spacing — the whole site updates.

---

## 📐 Architecture Notes

- **No frameworks** — pure vanilla ES modules
- **No build step** — works directly in any modern browser
- **CMS via JSON** — all content is in `data/*.json`, no database needed
- **Component architecture** — `components/nav.js` is shared across all pages
- **Reveal animations** — scroll-triggered via IntersectionObserver (no dependencies)
- **Responsive** — mobile-first CSS with clean breakpoints

---

Built with care. Edit freely.
