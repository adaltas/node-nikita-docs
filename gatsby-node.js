

const path = require("path");

const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions;
  
  return new Promise((resolve, reject) => {
    if(page.path.match(/^\/test\//)){
      page.layout = 'blank'
      createPage(page)
    }
    if(!page.path.match(/^\/$/)){
      page.layout = 'doc'
    }
    resolve();
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    node.frontmatter.disabled = !!node.frontmatter.disabled
    slug = createFilePath({ node, getNode, basePath: `pages` })
    edit_url = 'https://github.com/adaltas/node-nikita-docs/edit/master/src/md' + createFilePath({ node, getNode, basePath: `pages`, trailingSlash: false }) + '.md'
    createNodeField({
      node,
      name: `slug`,
      value: slug
    })
    createNodeField({
      node,
      name: `edit_url`,
      value: edit_url
    })

  }
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions;
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
