

const path = require("path");

const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === `MarkdownRemark`) {
    slug = createFilePath({ node, getNode, basePath: `pages` })
    console.log('||',slug)
    createNodeField({
      node,
      name: `slug`,
      value: slug
    })
    createNodeField({
      node,
      name: `slug`,
      value: slug
    })
  }
};

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const blogPostTemplate = path.resolve(`src/templates/template.js`);

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___sort] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              title
              layout
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    console.log('ok', result)
    if (result.errors) {
      return Promise.reject(result.errors);
    }
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      console.log('>', node.frontmatter.layout || 'index', node.fields.slug)
      createPage({
        path: node.fields.slug,
        component: blogPostTemplate,
        layout: node.frontmatter.layout || 'index',
        context: {}, // additional data can be passed via context
      });
    });
  });
};
