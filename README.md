# DL2026 WP Theme

Custom WordPress theme for Don Livingston's personal and professional web properties. Features light/dark mode toggle, wave animation, and responsive layout. Based on Underscores.

## Deployed Sites

| Site | URL | Priority |
|---|---|---|
| DL WebWorx | dlwebworx.com | Highest |
| Personal/Professional | donaldlivingston.com | Second |
| Personal | donlivingston.me | Lowest |

## Local Development

Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/) and Node.js.

### Start the environment

```
docker-compose up -d
```

WordPress will be available at [http://localhost:8000](http://localhost:8000).

On first run, complete the WordPress installer, then activate the **DL2026** theme under **Appearance → Themes**.

### Install dependencies

```
npm install
```

### Build

```
npm run build       # production build
npm run watch       # watch mode for development
```

Compiled assets are output to `wp-content/themes/dl2026/`.

## Stack

- **WordPress** (latest) + **MariaDB 10.11** via Docker Compose
- **Webpack 5** + **Babel** for JS bundling
- **Dart Sass** + **sass-loader** for SCSS compilation
- **React 18** for interactive components
- Theme PHP templates based on [Underscores](https://underscores.me/)

## Theme Structure

```
wp-content/themes/dl2026/   # Theme root (PHP templates, compiled assets)
src/
  index.js                  # JS entry point
  styles/
    main.scss               # SCSS entry point
    _vars.scss              # CSS custom properties + Sass variables
    _fonts.scss             # Google Fonts imports
    _logo_and_animations.scss
    _wp-components.scss
    light_theme.scss        # Light mode overrides
    ...
```
