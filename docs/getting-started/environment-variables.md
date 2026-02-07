---
title: Environment Variables
description: Reference for all environment variables supported by the theme's astro.config.mjs.
sidebar:
  order: 2
---

The `astro.config.mjs` reads five environment variables at build time. Content repositories set these in their GitHub Actions workflow to customize each site without forking the theme.

## Variable Reference

| Variable | Default | Purpose |
|----------|---------|---------|
| `DOCS_TITLE` | `Documentation` | Site title shown in the header and browser tab |
| `DOCS_SITE` | `https://robinmordasiewicz.github.io` | Canonical base URL for the deployed site |
| `DOCS_BASE` | `/` | URL base path (e.g., `/my-repo/` for project sites) |
| `GITHUB_REPOSITORY` | _(empty string)_ | Used to build the GitHub social link in the header |
| `SIDEBAR_LABEL` | `Guide` | Label for the auto-generated sidebar section |

## Where Each Variable Is Used

### DOCS_TITLE

```js
const title = process.env.DOCS_TITLE || 'Documentation';
```

Passed to the Starlight `title` option. Appears in the site header and the HTML `<title>` tag.

### DOCS_SITE

```js
const site = process.env.DOCS_SITE || 'https://robinmordasiewicz.github.io';
```

Sets Astro's top-level `site` property. Used for canonical URLs, sitemap generation, and Open Graph metadata.

### DOCS_BASE

```js
const base = process.env.DOCS_BASE || '/';
```

Sets Astro's top-level `base` property. Required when deploying to a subdirectory (e.g., `https://example.github.io/my-repo/`).

### GITHUB_REPOSITORY

```js
{
  label: 'GitHub',
  icon: 'github',
  href: `https://github.com/${process.env.GITHUB_REPOSITORY || ''}`,
}
```

Used in the Starlight `social` array to generate the GitHub link in the site header. GitHub Actions sets this variable automatically (e.g., `owner/repo`).

### SIDEBAR_LABEL

```js
sidebar: [
  {
    label: process.env.SIDEBAR_LABEL || 'Guide',
    autogenerate: { directory: '/' },
  },
],
```

Controls the label text for the top-level sidebar group. Each content repo can set this to something descriptive like `Tutorials` or `API Reference`.

## Setting Variables in GitHub Actions

Content repositories pass these variables through their workflow:

```yaml
jobs:
  docs:
    uses: robinmordasiewicz/f5xc-template/.github/workflows/docs-build-deploy.yml@main
    with:
      docs_title: "My Project Docs"
      docs_site: "https://example.github.io"
      docs_base: "/my-project/"
      sidebar_label: "Tutorials"
```

The `GITHUB_REPOSITORY` variable is provided automatically by the GitHub Actions runner and does not need to be set manually.
