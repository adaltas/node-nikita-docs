module.exports = {
  pathPrefix: `/node-nikita-docs`,
  siteMetadata: {
    title: 'Nikita',
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
      }]
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
      }]
    },{
      title: 'About',
      content: 'Nikita is an open source product hosted on <a href="https://www.github.com">GitHub</a> and developed by <a href="http://www.adaltas.com">Adaltas</a>.'
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
    }
  ]
}
