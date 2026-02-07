---
title: Overview
description: What the f5xc-docs-theme repository is and how it fits into the F5 XC documentation ecosystem.
sidebar:
  order: 1
---

The `f5xc-docs-theme` repository provides a shared branding and styling layer for all F5 Distributed Cloud (XC) documentation sites. It is not a standalone site — it is consumed at build time by content repositories through the [f5xc-docs-builder](https://github.com/robinmordasiewicz/f5xc-docs-builder) reusable workflow.

## Repository Structure

| Path | Purpose |
|------|---------|
| `fonts/` | Custom web fonts (Neusa Next Pro Wide + Proxima Nova) and `@font-face` declarations |
| `styles/` | `custom.css` with CSS custom properties, Mermaid styling, code block theming, and callout styles |
| `assets/` | The F5 logo SVG displayed in the sidebar of every documentation site |
| `components/` | `Footer.astro` — a custom Starlight footer component with F5 social media links |
| `astro.config.mjs` | Shared Astro/Starlight configuration referencing all theme files |
| `docs/` | This documentation site (what you are reading now) |

## How Content Repos Use the Theme

```
Content repo (has only docs/ folder)
  ↓ push to main
f5xc-docs-builder workflow
  ↓ checks out content repo
  ↓ checks out f5xc-docs-theme → ./theme/
  ↓ astro build (uses theme/astro.config.mjs)
  ↓ deploys to GitHub Pages
```

Each content repository only needs a `docs/` folder with Markdown files. The builder workflow handles everything else — installing dependencies, pulling this theme, running the Astro build, and deploying.

## Technology Stack

- **Astro** with the **Starlight** documentation framework
- **React** integration for interactive components
- Custom **Mermaid** remark plugin for diagram rendering
- **woff2** web fonts for optimized loading

## Making Changes

Edit files in this repository directly. No `npm install` or local build step is required — the builder workflow handles the build.

For contribution rules and the required issue-first workflow, see [CONTRIBUTING.md](https://github.com/robinmordasiewicz/f5xc-docs-theme/blob/main/CONTRIBUTING.md).

:::caution
Changes to this theme affect **all** documentation sites that consume it. Test changes carefully and consider the impact across the entire documentation ecosystem.
:::
