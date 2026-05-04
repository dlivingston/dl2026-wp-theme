# DL2026 WP Theme — Claude Code Context

This file provides context for Claude Code sessions working on the DL2026 WordPress theme refresh.

---

## Project Overview

A refresh of the DL2020 custom WordPress theme, rebranded as DL2026. Deployed across three personal/professional web properties:

| Site | URL | Priority |
|---|---|---|
| DL WebWorx | dlwebworx.com | **Highest — client-ready before end of May 2026** |
| Personal/Professional | donaldlivingston.com | Second |
| Personal | donlivingston.me | Lowest |

**Repo:** https://github.com/dlivingston/dl2026-wp-theme  
**Hosting:** Bluehost (all three sites)  
**Local dev:** Docker Compose → `http://localhost:8000`  
**Theme location:** `wp-content/themes/dl2026/`  
**Build:** Webpack 4 + node-sass (needs updating — see tasks below)

---

## Immediate Tasks

### 1. Update `docker-compose.yml`
- [ ] Bump MySQL from `5.7` to `8.0` (or swap to `mariadb:10.11`) — 5.7 is EOL
- [ ] Optionally add a phpMyAdmin service for DB access

### 2. Update `package.json` dependencies
The build toolchain is circa 2020 and needs modernization:

| Current | Action |
|---|---|
| `node-sass@^4` | Replace with `sass` (dart-sass) — node-sass is abandoned |
| `webpack@^4` | Upgrade to webpack 5 |
| `webpack-cli@^3` | Upgrade to webpack-cli 5 |
| `webpack-dev-server@^3` | Upgrade to webpack-dev-server 5 |
| `mini-css-extract-plugin@^0.8` | Upgrade to current (^2) |
| `css-loader@^3` | Upgrade to current (^7) |
| `sass-loader@^8` | Upgrade to current (^16) — also update for dart-sass |
| `babel-loader@^8` | Upgrade to current (^9) |
| `@babel/core`, `@babel/preset-env`, `@babel/preset-react` | Upgrade to current |
| `optimize-css-assets-webpack-plugin` | Replace with `css-minimizer-webpack-plugin` (webpack 5) |
| `uglifyjs-webpack-plugin` | Remove — `terser-webpack-plugin` already present |
| `clean-webpack-plugin@^3` | Upgrade to current (^4) |
| `react@^16`, `react-dom@^16` | Upgrade to React 18 |
| `webpack-fix-style-only-entries` | Evaluate — may not be needed in webpack 5 |

After updating `package.json`: delete `node_modules` and `package-lock.json`, run `npm install`, then verify `npm run build` compiles cleanly.

### 3. Update `webpack.config.js`
- [ ] Review and update config for webpack 5 compatibility
- [ ] Update any deprecated plugins/options
- [ ] Confirm SCSS entry points and output paths are correct

### 4. Update `style.css` theme header
- [ ] Update Description — currently references only personal sites, should cover all three properties or be generalized

### 5. Search and replace `dl2020` string references
- [ ] Grep the codebase for `dl2020` in function names, text domains, enqueue handles, etc.
- [ ] Rename to `dl2026` where appropriate
- [ ] Check: `functions.php`, `inc/`, template files

### 6. Verify Docker local environment
- [ ] `docker-compose up` and confirm WordPress loads at `http://localhost:8000`
- [ ] Activate the `dl2026` theme in WP admin
- [ ] Confirm theme loads without PHP errors
- [ ] Confirm `npm run watch` hot-reloads correctly

---

## SCSS Architecture Notes

SCSS source lives in `src/styles/`. Key files to be aware of:

### Wave Animation — Chrome Stutter Fix (already resolved in design notes)
The `@keyframes wave` in `_logo_and_animations.scss` was previously animating `stroke-width`, which forces repaints. The fix:
- Animate `opacity` only
- Add `will-change: opacity` to `#wave .line`
- Add `contain: layout style` to `#wave`

**Verify this fix is present in the current SCSS source.**

### Light Mode Wave Contrast (pending decision)
Wave uses `--dodger` (#41ADFF) at `opacity: 0.4` — too subtle against light mode cream background. Options:
- **Option B (recommended):** Override stroke to `--jellybean` (#2874ad) in `[data-theme=light]`
- **Option C:** Darker color + slightly higher opacity

**Awaiting design decision — implement once confirmed.**

---

## Typography — Decision

**Decided: 2026-05-03 — DM Sans + DM Mono**

| Role | Font | Weights |
|---|---|---|
| Headings / Subheadings | DM Sans | 800 (display), 600 (subhead) |
| Body copy | DM Sans | 400 regular, 300 light |
| Nav, badges, code labels, tech tags | DM Mono | 400 |

### Google Fonts Import
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,600;0,9..40,800&family=DM+Mono:wght@400&display=swap" rel="stylesheet">
```

Implement in `_typography.scss` once palette is confirmed.

---

## Color Palette — Decision Pending

Three options on the table. Do not implement until owner confirms selection.

### Option A — Slate & Amber (most conservative)
- Dark bg: `#16181c` / `#1f2227` | Accent: `#E8971E` | Wave: `#38BDF8`
- Light bg: `#f0f2f4` / `#ffffff` | Accent: `#B86E0C` | Links: `#1A6FB5`

### Option B — Graphite & Indigo (biggest departure — drops gold)
- Dark bg: `#1a1a1e` / `#232328` | Accent: `#818CF8` | Wave: `#60A5FA`
- Light bg: `#f5f5f7` / `#ffffff` | Accent: `#4F46E5` | Links: `#3B82F6`

### Option C — Deep Ink & Teal (middle ground)
- Dark bg: `#141618` / `#1c1f23` | Accent: `#2DD4BF` | Wave: `#38BDF8`
- Light bg: `#f7f8f9` / `#ffffff` | Accent: `#0D9488` | Links: `#0E7490`

Elements can be mixed across options. Implement in `_vars.scss` once decided.

---

## Design Decisions — What to Keep / What to Update

### Keep
- DL monogram logo
- Wave background motif
- Dark/light mode toggle
- Page load transition sequence
- Real headshot

### Update
- Skill bar/percentage charts → clean technology badge grid
- Headline/tagline → reflect senior consulting positioning
- Skills list → remove dated tools (Grunt, Bower, jQuery, PHP prominence), add TypeScript, Next.js, Tailwind, AI tooling
- Blog section → remove from dlwebworx.com
- Logo intro animation → reduce from ~4.5s to 1.5–2s for returning visitors

---

## Site-Specific Notes

**dlwebworx.com** is conversion-oriented — a prospective client or recruiter lands here and immediately understands who Don is, what he builds, and how to hire him. Less personal bio, more business tool. Pages: Home, Services, Work/Portfolio, About, Contact.

**donaldlivingston.com** carries the personality and depth — resume, full background, interests, writing.

**donlivingston.me** — lowest priority, purpose TBD (personal blog, creative writing, or redirect).

---

## Current Phase

**Phase 0 (Discovery) → transitioning to Phase 1 (Theme Refresh)**

Phase 1 work starts with the dependency updates and local env verification above.
