# Repository Purpose

## Overview

The `f5xc-docs-theme` repository provides a shared branding and styling layer for all F5 Distributed Cloud (XC) documentation sites. It is not a standalone site — it is consumed at build time by content repositories through the [f5xc-docs-builder](https://github.com/robinmordasiewicz/f5xc-docs-builder) reusable workflow.

## What This Repository Contains

| Directory | Purpose |
|-----------|---------|
| `fonts/` | Custom web fonts (Neusa Next Pro Wide for headings, Proxima Nova for body text) and `@font-face` declarations |
| `styles/` | `custom.css` with CSS custom properties, Mermaid diagram styling, code block theming, and callout box styles |
| `assets/` | The F5 logo SVG used in the sidebar of every documentation site |
| `components/` | `Footer.astro` — a custom Starlight footer component with F5 social media links |
| `astro.config.mjs` | Shared Astro/Starlight configuration that references the theme files and sets up the site structure |

## How It Works

```
Content repo push
  -> f5xc-docs-builder workflow runs
     -> Checks out this theme repo into builder/theme/
     -> Astro build uses theme files (fonts, styles, logo, footer)
     -> Site deployed with consistent F5 branding
```

All documentation sites built with this theme share the same visual identity: F5 fonts, logo, color scheme, code block styling, and footer. Updating a file here propagates to every site on its next build.

## Technology Stack

- **Astro** with the **Starlight** documentation framework
- **React** integration for interactive components
- Custom **Mermaid** remark plugin for diagram rendering
- **woff2** web fonts for optimized loading

## Environment Variables

The `astro.config.mjs` supports these environment variables for per-site customization:

| Variable | Default | Purpose |
|----------|---------|---------|
| `DOCS_TITLE` | `Documentation` | Site title shown in the header |
| `DOCS_SITE` | `https://robinmordasiewicz.github.io` | Base URL for the deployed site |
| `DOCS_BASE` | `/` | URL base path |
| `GITHUB_REPOSITORY` | _(empty)_ | Used to generate the GitHub social link |
| `SIDEBAR_LABEL` | `Guide` | Label for the auto-generated sidebar section |

## Design Decisions

- **Centralized theme**: A single repository ensures visual consistency across all F5 XC documentation sites without duplicating branding assets.
- **No build tooling required**: Contributors can edit fonts, styles, and components directly — no `npm install` or build step needed in this repo.
- **Environment-driven configuration**: Each content site can customize its title, URL, and sidebar label without forking the theme.
- **Starlight component overrides**: The footer uses Starlight's component replacement pattern, extending the default footer rather than replacing it entirely.

## License

MIT License. See [LICENSE](../LICENSE) for details.
