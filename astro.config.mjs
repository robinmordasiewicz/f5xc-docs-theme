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
import starlightMegaMenu from 'starlight-mega-menu';

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
        starlightMegaMenu({
          items: [
            {
              label: 'Products',
              content: {
                layout: 'grid',
                columns: 2,
                categories: [
                  {
                    title: 'App Security',
                    items: [
                      {
                        label: 'Web App & API Protection',
                        description: 'Comprehensive app and API security',
                        href: '/products/waap/',
                      },
                      {
                        label: 'Bot Defense',
                        description: 'AI-driven bot mitigation',
                        href: '/products/bot-defense/',
                      },
                    ],
                  },
                  {
                    title: 'Networking',
                    items: [
                      {
                        label: 'Multi-Cloud Networking',
                        description: 'Connect apps across clouds',
                        href: '/products/mcn/',
                      },
                      {
                        label: 'DNS & DNS Load Balancing',
                        description: 'Intelligent DNS services',
                        href: '/products/dns/',
                      },
                    ],
                  },
                ],
                footer: {
                  label: 'View all products',
                  href: '/products/',
                  description: 'Explore the full F5 Distributed Cloud suite',
                },
              },
            },
            {
              label: 'Solutions',
              content: {
                layout: 'list',
                categories: [
                  {
                    title: 'By Use Case',
                    items: [
                      {
                        label: 'API Security',
                        description: 'Protect APIs across multi-cloud environments',
                        href: '/solutions/api-security/',
                      },
                      {
                        label: 'Multi-Cloud Networking',
                        description: 'Secure connectivity across any cloud',
                        href: '/solutions/multi-cloud/',
                      },
                      {
                        label: 'Edge Computing',
                        description: 'Deploy apps at the edge with F5 XC AppStack',
                        href: '/solutions/edge/',
                      },
                    ],
                  },
                ],
              },
            },
            {
              label: 'Docs',
              href: '/',
            },
            {
              label: 'Support',
              href: 'https://my.f5.com/manage/s/',
            },
          ],
        }),
        starlightVideosPlugin(),
        starlightImageZoom(),
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
        starlightHeadingBadges(),
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
