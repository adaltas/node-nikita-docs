// React
import React, { Component } from 'react'
import Helmet from 'react-helmet'
// Material UI
import { withStyles } from '@material-ui/core/styles'
// Gatsby
import { graphql } from 'gatsby'
// Local
import Layout from '../components/doc'

const styles = theme => ({})

class Template extends Component {
  render() {
    const { data } = this.props
    const { page } = data // data.markdownRemark holds our post data
    const { frontmatter, html } = page
    return (
      <Layout page={page}>
        <Helmet
          title={'NIKITA - ' + frontmatter.title}
          meta={[
            { name: 'description', content: frontmatter.description },
            { name: 'keywords', content: frontmatter.keywords },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Layout>
    )
  }
}
export default withStyles(styles, { withTheme: true })(Template)

export const pageQuery = graphql`
  query($path: String!) {
    page: markdownRemark(fields: { slug: { eq: $path } }) {
      html
      fields {
        slug
        edit_url
      }
      frontmatter {
        title
        description
        keywords
      }
    }
  }
`
