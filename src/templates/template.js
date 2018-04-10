import React from 'react'
import Helmet from 'react-helmet'

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
  updateLayoutFunction,
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  // updateLayoutFunction({path: markdownRemark.fields.slug})
  return (
    <div className="blog-post-container">
      <Helmet
        title={'NIKITA - ' + frontmatter.title}
        meta={[
          { name: 'description', content: frontmatter.description },
          { name: 'keywords', content: frontmatter.keywords },
        ]}
      />
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
