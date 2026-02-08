import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import f5xcDocsTheme from 'f5xc-docs-theme';

export default defineConfig({
  site: process.env.DOCS_SITE || 'https://robinmordasiewicz.github.io',
  base: process.env.DOCS_BASE || '/',
  integrations: [
    starlight({
      title: process.env.DOCS_TITLE || 'Documentation',
      plugins: [f5xcDocsTheme()],
      logo: {
        src: 'f5xc-docs-theme/assets/f5-logo.svg',
      },
      social: [
        {
          label: 'GitHub',
          icon: 'github',
          href: `https://github.com/${process.env.GITHUB_REPOSITORY || ''}`,
        },
      ],
      sidebar: [
        {
          label: process.env.SIDEBAR_LABEL || 'Guide',
          autogenerate: { directory: '/' },
        },
      ],
    }),
    react(),
  ],
});
