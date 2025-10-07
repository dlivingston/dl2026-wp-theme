## Quick orientation

This repository contains a WordPress theme (wp-content/themes/dl2020) plus a frontend build pipeline under `src/` that compiles into the theme directory. Front-end source (React + SCSS) lives in `src/` and is bundled by Webpack into `wp-content/themes/dl2020/main.js` and `main.css`.

Keep changes focused on source files in `src/` (JSX/JS and SCSS). Avoid editing generated files in `wp-content/themes/dl2020` except when intentionally modifying PHP templates.

## Big-picture architecture

- WordPress PHP theme (server-rendered) lives at `wp-content/themes/dl2020/`. Key bootstrap: `functions.php` registers menus, enqueues `main.css` and `main.js` (look there to understand runtime hooks and asset versioning).
- Front-end UI is implemented with React components mounted into DOM placeholders by `src/index.js`. React fetches content via the WordPress REST API (`/wp-json/wp/v2/...`).
- Build: `webpack.config.js` takes `src/index.js` and `src/styles/main.scss` as the entrypoints and writes `main.js` and `main.css` to the theme folder.

Example: webpack entry shows
`entry: { main: ['./src/index.js', './src/styles/main.scss'] }` -> outputs to `wp-content/themes/dl2020`.

## Dev / build workflows (explicit commands)

- Install node deps: `npm ci` (README recommends this).
- Local WordPress container: `docker-compose up -d` (spins up the environment described in `docker-compose.yml`).
- Watch while developing front-end: `npm run watch` (runs `webpack --watch --mode=development` and writes updated bundles directly into the theme folder).
- Create production bundles: `npm run build` (runs `webpack --mode=production`).

Notes: webpack-dev-server is a devDependency but the project uses `webpack --watch`. Live reload plugin appears in package.json (`webpack-livereload-plugin`) but is not wired in `webpack.config.js` — implement intentionally if you need automatic browser refresh.

## Project-specific conventions & patterns

- Source -> Theme output: edit `src/*` and run `npm run watch` / `npm run build`. Do not hand-edit `wp-content/themes/dl2020/main.css` or `main.js` because they are generated.
- SCSS is modular: `src/styles/` contains many partials (`_vars.scss`, `_typography.scss`, `_elements.scss`). Import order matters; `main.scss` centrally imports these partials.
- Theme asset registration/versioning: `wp-content/themes/dl2020/functions.php` enqueues `main.css` and `main.js` with a hard-coded version string (`1.2.1`). If you change build output semantics, update that file accordingly.
- REST API usage: code mixes relative and absolute endpoints. Example in `src/index.js`:
  - Projects component uses relative API calls: `axios.get('/wp-json/wp/v2/posts?...')` (works for local WP container)
  - BlogPosts uses an absolute host: `axios.get('https://donlivingston.me/index.php/wp-json/wp/v2/posts?...')` (explicit remote call)

When editing API calls, prefer relative endpoints for local development unless intentionally querying production.

## Integration points & external dependencies

- React + ReactDOM (UI components mounted into server templates).
- Axios used for REST requests; some calls embed HTML excerpts via `dangerouslySetInnerHTML` — observe how excerpts are used in `src/index.js`.
- Polyfills: `smoothscroll-polyfill` is initialized in `src/index.js`.
- Build tooling: Webpack 4, Babel presets (`@babel/preset-env`, `@babel/preset-react`), `sass-loader`/`node-sass` + `mini-css-extract-plugin`.

## Files to inspect first (high signal)

- `package.json` — scripts and dependencies (watch/build).
- `webpack.config.js` — entrypoints, output path (important: output -> theme folder), loaders and optimization.
- `src/index.js` — main frontend wiring: theme toggle, DOM mounts, React components (Projects, BlogPosts) and API usage.
- `src/styles/main.scss` and `src/styles/_vars.scss` — theming variables and import order for SCSS.
- `wp-content/themes/dl2020/functions.php` — how assets are enqueued and what PHP-side hooks are available.
- `docker-compose.yml` & `README.md` — local WordPress environment and install instructions.

## Observable pitfalls and shortcuts for changes

- If page behavior changes but you don't see updates, ensure `npm run watch` is running and that the generated `main.js` / `main.css` are updated in `wp-content/themes/dl2020`.
- Because excerpts and titles come from the REST API as HTML, changes to sanitization or rendering are visible in `src/index.js` where `dangerouslySetInnerHTML` is used.
- When adding npm packages, run `npm ci` (CI) or `npm i` locally and ensure lockfile behavior matches repository policy before committing.

## What I (the agent) can do for you next

- Update `functions.php` to use an automatic asset version (timestamp or package.json version) if desired.
- Wire `webpack-livereload-plugin` into `webpack.config.js` for automatic browser reloads when bundles change.

If any section is unclear or you want extra details (example patches for auto-versioning or live-reload wiring), tell me which piece to expand and I will update this file.
