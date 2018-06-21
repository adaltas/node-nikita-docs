import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import 'typeface-roboto'
import classNames from 'classnames'

// Material UI
import { withStyles } from '@material-ui/core/styles'
import withRoot from './mui/withRoot'
import Hidden from '@material-ui/core/Hidden'
// Local
import AppBar from './shared/AppBar'
import Content from './shared/Content'
import Drawer from './shared/Drawer'
import Footer from './shared/Footer'
import Menu from './shared/Menu'
import Intro from './home/Intro'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: '100vh',
    width: '100%',
  },
  content: {
    width: '100%',
    marginLeft: 0,
  },
})

class Layout extends React.Component {
  state = {
    drawerOpen: true,
  }
  render() {
    const { children, classes, data } = this.props
    const site = data.site.siteMetadata
    const onToggle = () => {
      this.setState({ drawerOpen: !this.state.drawerOpen })
    }
    const menu = {children: {}}
    data.menu.edges.map( edge => {
      const slugs = edge.node.fields.slug.split('/').filter( part => part )
      let parentMenu = menu
      slugs.map( slug => {
        if( !parentMenu.children[slug] ) parentMenu.children[slug] = {data: {}, children: {}}
        parentMenu = parentMenu.children[slug]
      })
      parentMenu.data = {
        id: slugs.join('/'),
        title: edge.node.frontmatter.title,
        slug: edge.node.fields.slug,
        sort: edge.node.frontmatter.sort || 99
      }
    })
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
          <AppBar
            ref={child => {
              this.appbar = child
            }}
            open={!this.state.drawerOpen}
            onMenuClick={onToggle}
            site={site}
            opacity={0.3}
          />
        </Hidden>
        <Hidden smDown implementation="css">
          <AppBar
            ref={child => {
              this.appbar = child
            }}
            open={!this.state.drawerOpen}
            onMenuClick={onToggle}
            site={site}
            opacity={0.3}
          />
        </Hidden>
        <Hidden mdUp>
          <Drawer
            open={!this.state.drawerOpen}
            onClickShadow={onToggle}
            variant="temporary"
          >
            {
              Object.values(menu.children)
              .sort( (p1, p2) => p1.data.sort > p2.data.sort )
              .map( page => <Menu key={page.data.slug} menu={page} path={this.state.path} />)
            }
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            open={!this.state.drawerOpen}
            onClickShadow={onToggle}
            variant="persistent"
          >
            {
              Object.values(menu.children)
              .sort( (p1, p2) => p1.data.sort > p2.data.sort )
              .map( page => <Menu key={page.data.slug} menu={page} path={this.state.path} />)
            }
          </Drawer>
        </Hidden>
        <div ref="content" className={classNames(classes.content, {[classes.contentShift]: !this.state.drawerOpen})}>
          <Intro />
          <Content>{children()}</Content>
          <Footer site={site} />
        </div>
      </div>
    )
  }
}

export default withRoot(withStyles(styles, { withTheme: true })(Layout))

export const query = graphql`
  query IndexQuery {
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
    menu: allMarkdownRemark(
      filter: { frontmatter: { disabled: { eq: false } }, fields: { slug: { regex: "/^/.+/" } } }
      sort: { order: ASC, fields: [frontmatter___sort] }
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
`
