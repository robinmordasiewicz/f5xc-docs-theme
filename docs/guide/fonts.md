---
title: Fonts
description: Custom font families, weights, and how to replace them.
sidebar:
  order: 1
---

The theme uses two custom font families loaded as optimized woff2 web fonts.

## Font Families

| Family | CSS Name | Usage | Weights |
|--------|----------|-------|---------|
| Neusa Next Pro Wide | `neusaNextProWide` | Headings (h1–h6) | 300, 400, 500, 700 |
| Proxima Nova | `proximaNova` | Body text, UI elements | 400, 500, 600, 700 |

## Font Files

All 8 font files live in `fonts/`:

```
fonts/
├── font-face.css
├── neusaNextProWide-300.woff2
├── neusaNextProWide-400.woff2
├── neusaNextProWide-500.woff2
├── neusaNextProWide-700.woff2
├── proximaNova-400.woff2
├── proximaNova-500.woff2
├── proximaNova-600.woff2
└── proximaNova-700.woff2
```

## Font-Face Declarations

The `fonts/font-face.css` file registers each font with `@font-face` rules:

```css
@font-face {
  font-family: "neusaNextProWide";
  font-weight: 300;
  font-style: normal;
  font-display: swap;
  src: url("./neusaNextProWide-300.woff2") format("woff2");
}

/* ... repeated for each weight/family combination */
```

Key properties:
- **`font-display: swap`** — text renders immediately with a fallback font, then swaps when the custom font loads
- **`format("woff2")`** — modern compressed format supported by all current browsers
- **Relative URLs** — `./` paths resolve relative to the CSS file location

## How Fonts Are Loaded

1. `astro.config.mjs` includes `font-face.css` in the `customCss` array:
   ```js
   customCss: [
     './theme/fonts/font-face.css',
     './theme/styles/custom.css',
   ],
   ```

2. `styles/custom.css` assigns the fonts to CSS variables and heading selectors:
   ```css
   :root {
     --sl-font: "proximaNova", -apple-system, "system-ui", ...;
   }

   h1, h2, h3, h4, h5, h6 {
     font-family: "neusaNextProWide", -apple-system, "system-ui", ...;
   }
   ```

## Replacing Fonts

To use different fonts:

1. **Add woff2 files** to `fonts/` using the naming convention `familyName-weight.woff2`
2. **Update `font-face.css`** with new `@font-face` rules matching your file names and weights
3. **Update `styles/custom.css`** to set the `--sl-font` variable and heading `font-family` to your new family names
4. **Keep fallback fonts** in the font stack (`-apple-system, "system-ui", ...`) for fast initial rendering
