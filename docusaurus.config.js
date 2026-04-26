// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Tech Wiki',
  tagline: 'Internal documentation for our engineering team',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://github.com/wumingxj',
  baseUrl: '/my-wiki/',

  organizationName: 'wumingxj',
  projectName: 'my-wiki',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
      onBrokenMarkdownImages: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          showLastUpdateTime: false,
          showLastUpdateAuthor: false,
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'Tech Notes',
          blogDescription: 'Engineering updates, announcements, and learnings',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Tech Wiki',
        logo: {
          alt: 'Omada Logo',
          src: 'img/omada_logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'wikiSidebar',
            position: 'left',
            label: 'Docs',
          },
          {to: '/blog', label: 'Tech Notes', position: 'left'},
          {
            href: 'https://github.com/wimingxj/my-wiki',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {label: 'Getting Started', to: '/docs/intro'},
              {label: 'Architecture', to: '/docs/architecture/overview'},
              {label: 'Runbooks', to: '/docs/runbooks/overview'},
            ],
          },
          {
            title: 'Sections',
            items: [
              {label: 'API Reference', to: '/docs/api/overview'},
              {label: 'Infrastructure', to: '/docs/infrastructure/overview'},
              {label: 'Decisions (ADRs)', to: '/docs/decisions/overview'},
            ],
          },
          {
            title: 'More',
            items: [
              {label: 'Tech Notes', to: '/blog'},
              {label: 'GitHub', href: 'https://github.com/your-org/my-wiki'},
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Your Team. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'yaml', 'json', 'python', 'go', 'java', 'sql'],
      },
    }),
};

export default config;
