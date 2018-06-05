

const path = require("path");

const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreatePage = ({ page, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  
  return new Promise((resolve, reject) => {
    if(page.path.match(/^\/test\//)){
      page.layout = 'blank'
      createPage(page)
    }
    resolve();
  });
};

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === `MarkdownRemark`) {
    node.frontmatter.disabled = !!node.frontmatter.disabled
    slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug
    })
  }
};

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage, createRedirect } = boundActionCreators;
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
              redirects
              disabled
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if(node.frontmatter.disabled) return
      createPage({
        path: node.fields.slug,
        component: blogPostTemplate,
        layout: node.frontmatter.layout || 'doc',
        context: {}, // additional data can be passed via context
      });
      if(node.frontmatter.redirects){
        node.frontmatter.redirects.map( redirect => {
          createRedirect({ fromPath: redirect, toPath: node.fields.slug, isPermanent: true, redirectInBrowser: true })
        })
      }
    });
  });
};
