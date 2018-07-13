import React from 'react'
import Layout from '../components/doc'
import Helmet from 'react-helmet'
import { graphql } from "gatsby"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { page } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = page
  return (
    <Layout>
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
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    page: markdownRemark(fields: { slug: { eq: $path } }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        description
        keywords
      }
    }
  }
`
