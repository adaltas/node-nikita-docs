module.exports = {
  pathPrefix: `/node-nikita-docs`,
  siteMetadata: {
    title: 'Nikita',
    description: 'Automation of system deployments for applications and infrastructures.',
    keywords: 'automation, deployment, node.js, devops, systems, applications, infrastructures',
    github: {
      url: 'https://github.com/adaltas/node-nikita',
      title: 'Nikita GitHub Repository'
    },
    issues: {
      url: 'https://github.com/adaltas/node-nikita/issues',
      title: 'Report an issue'
    },
    footer: [{
      title: 'Navigate',
      links: [{
        label: 'Getting started',
        url: '/about/',
      }, {
        label: 'Usages',
        url: '/usages/',
      }, {
        label: 'Options',
        url: '/options/',
      }],
      xs: 6,
      sm: 3,
    },{
      title: 'Contribute',
      links: [{
        label: 'GitHub',
        url: 'https://github.com/adaltas/node-nikita',
      }, {
        label: 'Issue Tracker',
        url: 'https://github.com/adaltas/node-nikita/issues',
      }, {
        label: 'License',
        url: '/about/license',
      }],
      xs: 6,
      sm: 3,
    },{
      title: 'About',
      content: 'Nikita is an open source product hosted on <a href="https://www.github.com" target="_blank" rel="noopener">GitHub</a> and developed by <a href="http://www.adaltas.com" target="_blank" rel="noopener">Adaltas</a>.',
      xs: 12,
      sm: 6,
    }]
  },
  plugins: [
    // Fix https://github.com/gatsbyjs/gatsby/issues/2049
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-react-helmet`,
     {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/md`,
        name: "markdown-pages",
      },
    // },{
    //   resolve: `gatsby-plugin-typography`,
    //   options: {
    //     pathToConfigModule: `src/utils/typography.js`,
    //   },
    },{
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              offsetY: '64' // <600: 48; >600:64 
            }
          },{
            resolve: 'gatsby-remark-toc-patched',
            options: {
              header: 'Table of Contents', // the custom header text
              include: [
                '**/*.md' // an include glob to match against
              ]
            }
          },{
            resolve: `gatsby-remark-prismjs`,
            options: {
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (eg <pre class="language-js">).
              // If your site loads Prism into the browser at runtime,
              // (eg for use with libraries like react-live),
              // you may use this to prevent Prism from re-processing syntax.
              // This is an uncommon use-case though;
              // If you're unsure, it's best to use the default value.
              classPrefix: "language-",
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              // A suggested value for English speakers is the non-ascii
              // character '›'.
              inlineCodeMarker: null,
              // This lets you set up language aliases.  For example,
              // setting this to '{ sh: "bash" }' will let you use
              // the language "sh" which will highlight using the
              // bash highlighter.
              aliases: {},
            },
          },
        ],
      },
    },{
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-1322093-4",
      },
    },{
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Nikita",
        short_name: "Nikita",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#105859",
        display: "minimal-ui",
        icon: "src/images/logo.png", // This path is relative to the root of the site.
      },
    },{
      resolve: `gatsby-plugin-offline`
    }
  ]
}
