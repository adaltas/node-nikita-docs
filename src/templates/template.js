// React
import React from 'react'
import Helmet from 'react-helmet'
// Material UI
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import EditIcon from '@material-ui/icons/EditOutlined'
import { withStyles } from '@material-ui/core/styles'
// Gatsby
import { graphql } from "gatsby"
// Local
import Layout from '../components/doc'

const styles = theme => ({
  icons: {
    float: 'right',
  },
})

function Template({
  data, classes,
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
        <Tooltip
          id="content-edit"
          title="Edit on GitHub"
          enterDelay={300}
        >
          <IconButton
            color="inherit"
            href={page.fields.edit_url}
            target="_blank"
            aria-labelledby="content-edit"
            className={classes.icons}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  )
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
