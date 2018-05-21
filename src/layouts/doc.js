import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import 'typeface-roboto'

import { withStyles } from '@material-ui/core/styles'
import withRoot from './mui/withRoot'
import Hidden from '@material-ui/core/Hidden'

import AppBar from './doc/AppBar'
import Content from './doc/Content'
import Drawer from './doc/Drawer'
import Footer from './doc/Footer'
import Menu from './doc/Menu'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: '100vh',
    width: '100%',
  },
  content: {
    width: '100%',
  },
})

class Layout extends React.Component {
  state = {
    drawerOpen: true,
  }
  render() {
    const { children, classes, data } = this.props
    const site = data.site.siteMetadata
    const menuAbout = this.props.data.about.edges.map(edge => {
      return edge.node
    })
    const menuUsages = this.props.data.usages.edges.map(edge => {
      return edge.node
    })
    const menuOptions = this.props.data.options.edges.map(edge => {
      return edge.node
    })
    const onToggle = () => {
      this.setState({ drawerOpen: !this.state.drawerOpen })
    }
    return (
      <div className={classes.root}>
        <Helmet
          title={site.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <Hidden mdUp>
          <AppBar onMenuClick={onToggle} site={site} />
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
            <Menu title="Learning" menu={menuAbout} path={this.state.path} />
            <Menu title="Usages" menu={menuUsages} path={this.state.path} />
            <Menu title="Options" menu={menuOptions} path={this.state.path} />
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            open={this.state.drawerOpen}
            onClickShadow={onToggle}
            variant="persistent"
          >
            <Menu title="Learning" menu={menuAbout} path={this.state.path} />
            <Menu title="Usages" menu={menuUsages} path={this.state.path} />
            <Menu title="Options" menu={menuOptions} path={this.state.path} />
          </Drawer>
        </Hidden>
        <div className={classes.content}>
          <Content>{children()}</Content>
          <Footer site={site} />
        </div>
      </div>
    )
  }
}

export default withRoot(withStyles(styles, { withTheme: true })(Layout))

export const pageQuery = graphql`
  query DocLayout {
    site: site {
      siteMetadata {
        title
        github {
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
        }
      }
    }
    about: allMarkdownRemark(
      filter: { fields: { slug: { regex: "/^/about//" } } }
      sort: { order: ASC, fields: [frontmatter___sort] }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
    usages: allMarkdownRemark(
      filter: { fields: { slug: { regex: "/^/usages//" } } }
      sort: { order: ASC, fields: [frontmatter___sort] }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
    options: allMarkdownRemark(
      filter: { fields: { slug: { regex: "/^/options//" } } }
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
