import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import f5xcDocsTheme from 'f5xc-docs-theme';
import remarkMermaid from './src/plugins/remark-mermaid.mjs';

export default defineConfig({
  site: process.env.DOCS_SITE || 'https://robinmordasiewicz.github.io',
  base: process.env.DOCS_BASE || '/',
  markdown: {
    remarkPlugins: [remarkMermaid],
  },
  integrations: [
    starlight({
      title: process.env.DOCS_TITLE || 'Documentation',
      plugins: [f5xcDocsTheme()],
      logo: {
        src: 'f5xc-docs-theme/assets/f5-logo.svg',
      },
      ...(process.env.GITHUB_REPOSITORY ? {
        editLink: {
          baseUrl: `https://github.com/${process.env.GITHUB_REPOSITORY}/edit/main/`,
        },
      } : {}),
      social: [
        {
          label: 'GitHub',
          icon: 'github',
          href: `https://github.com/${process.env.GITHUB_REPOSITORY || ''}`,
        },
      ],
    }),
    react(),
  ],
});
