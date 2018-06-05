import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../layouts/doc'

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
  updateLayoutFunction,
}) {
  const { page } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = page
  // updateLayoutFunction({path: markdownRemark.fields.slug})
  return (
    <div>
      <Helmet
        title={'NIKITA - ' + frontmatter.title}
        meta={[
          { name: 'description', content: frontmatter.description },
          { name: 'keywords', content: frontmatter.keywords },
        ]}
      />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    page: markdownRemark(fields: { slug: { eq: $path } }) {
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
