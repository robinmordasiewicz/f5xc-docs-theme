import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import f5xcDocsTheme from 'f5xc-docs-theme';
import remarkMermaid from './src/plugins/remark-mermaid.mjs';
import starlightScrollToTop from 'starlight-scroll-to-top';
import starlightImageZoom from 'starlight-image-zoom';
import starlightHeadingBadges from 'starlight-heading-badges';
import starlightVideosPlugin from 'starlight-videos';
import starlightPageActions from 'starlight-page-actions';
import { starlightIconsPlugin } from 'starlight-plugin-icons';
import starlightLlmsTxt from 'starlight-llms-txt';

export default defineConfig({
  site: process.env.DOCS_SITE || 'https://robinmordasiewicz.github.io',
  base: process.env.DOCS_BASE || '/',
  markdown: {
    remarkPlugins: [remarkMermaid],
  },
  integrations: [
    starlight({
      title: process.env.DOCS_TITLE || 'Documentation',
      plugins: [
        f5xcDocsTheme(),
        starlightScrollToTop({
          showTooltip: true,
          tooltipText: 'Scroll to top',
          smoothScroll: true,
          threshold: 10,
          showProgressRing: true,
          progressRingColor: '#e4002b',
          showOnHomepage: false,
        }),
        starlightImageZoom(),
        starlightHeadingBadges(),
        starlightVideosPlugin(),
        starlightPageActions(),
        starlightIconsPlugin(),
        starlightLlmsTxt({
          projectName: process.env.DOCS_TITLE || 'Documentation',
          description: process.env.DOCS_DESCRIPTION || '',
          rawContent: true,
          optionalLinks: process.env.LLMS_OPTIONAL_LINKS
            ? JSON.parse(process.env.LLMS_OPTIONAL_LINKS)
            : [],
        }),
      ],
      logo: {
        src: 'f5xc-docs-theme/assets/github-avatar.png',
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
