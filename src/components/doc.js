// React
import React from 'react'
import PropTypes from 'prop-types'
// Material UI
import { withStyles } from '@material-ui/core/styles'
import withRoot from './mui/withRoot'
import Hidden from '@material-ui/core/Hidden'
import 'typeface-roboto'
// Gatsby
import { StaticQuery, graphql } from 'gatsby'
// Local
import AppBar from './shared/AppBar'
import Content from './shared/Content'
import Drawer from './shared/Drawer'
import Footer from './shared/Footer'
import Menu from './shared/Menu'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: '100vh',
    width: '100%',
  },
  content: {
    width: '100%',
    paddingTop: 60,
  },
})

class Layout extends React.Component {
  state = {
    drawerOpen: true,
  }
  render() {
    const { children, classes, data } = this.props
    const page = data.page
    const site = data.site.siteMetadata
    const onToggle = () => {
      this.setState({ drawerOpen: !this.state.drawerOpen })
    }
    const menu = { children: {} }
    data.menu.edges.map(edge => {
      const slugs = edge.node.fields.slug.split('/').filter(part => part)
      let parentMenu = menu
      slugs.map(slug => {
        if (!parentMenu.children[slug])
          parentMenu.children[slug] = { data: {}, children: {} }
        parentMenu = parentMenu.children[slug]
      })
      parentMenu.data = {
        id: slugs.join('/'),
        title: edge.node.frontmatter.title,
        slug: edge.node.fields.slug,
        sort: edge.node.frontmatter.sort || 99,
      }
    })
    return (
      <div className={classes.root}>
        <Hidden mdUp>
          <AppBar
            open={!this.state.drawerOpen}
            onMenuClick={onToggle}
            site={site}
          />
        </Hidden>
        <Hidden smDown implementation="css">
          <AppBar
            open={this.state.drawerOpen}
            onMenuClick={onToggle}
            site={site}
          />
        </Hidden>
        <Hidden mdUp>
          <Drawer
            open={!this.state.drawerOpen}
            onClickShadow={onToggle}
            variant="temporary"
          >
            {Object.values(menu.children)
              .sort((p1, p2) => p1.data.sort > p2.data.sort)
              .map(page => (
                <Menu
                  key={page.data.slug}
                  menu={page}
                  path={this.state.path}
                  onClickLink={onToggle}
                />
              ))}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            open={this.state.drawerOpen}
            onClickShadow={onToggle}
            variant="persistent"
          >
            {Object.values(menu.children)
              .sort((p1, p2) => p1.data.sort > p2.data.sort)
              .map(page => (
                <Menu key={page.data.slug} menu={page} path={this.state.path} />
              ))}
          </Drawer>
        </Hidden>
        <div className={classes.content}>
          <Content page={this.props.page}>{children}</Content>
          <Footer site={site} />
        </div>
      </div>
    )
  }
}

Layout.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}

const WrappedLayout = props => (
  <StaticQuery
    query={graphql`
      query DocQuery {
        site: site {
          siteMetadata {
            title
            github {
              url
              title
            }
            issues {
              url
              title
            }
            footer {
              title
              content
              links {
                label
                url
              }
              xs
              sm
            }
          }
        }
        menu: allMarkdownRemark(
          filter: {
            frontmatter: { disabled: { eq: false } }
            fields: { slug: { regex: "/^/.+/" } }
          }
          sort: { order: ASC, fields: [frontmatter___sort, fields___slug] }
        ) {
          edges {
            node {
              id
              excerpt(pruneLength: 250)
              frontmatter {
                title
                sort
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `}
    render={data => <Layout data={data} {...props} />}
  />
)

export default withRoot(withStyles(styles, { withTheme: true })(WrappedLayout))

// export const pageQuery = graphql`
//   query DocLayout {
//     site: site {
//       siteMetadata {
//         title
//         github {
//           url
//           title
//         }
//         issues {
//           url
//           title
//         }
//         footer {
//           title
//           content
//           links {
//             label
//             url
//           }
//         }
//       }
//     }
//     menu: allMarkdownRemark(
//       filter: {
//         frontmatter: { disabled: { eq: false } }
//         fields: { slug: { regex: "/^/.+/" } }
//       }
//       sort: { order: ASC, fields: [frontmatter___sort, fields___slug] }
//     ) {
//       edges {
//         node {
//           id
//           excerpt(pruneLength: 250)
//           frontmatter {
//             title
//             sort
//           }
//           fields {
//             slug
//           }
//         }
//       }
//     }
//   }
// `
