import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import 'typeface-roboto'

import { withStyles } from '@material-ui/core/styles'
import withRoot from './mui/withRoot'
import Hidden from '@material-ui/core/Hidden'
import Button from '@material-ui/core/Button'

import AppBar from './doc/AppBar'
import Content from './doc/Content'
import Drawer from './doc/Drawer'
import Footer from './doc/Footer'
import Menu from './shared/Menu'
// Gatsby
import Link from 'gatsby-link'
// Particles
import Particles from 'react-particles-js'
import particles from './home/particles'
import mw from './home/milky-way-dark.jpg'

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
  particles: {
    // backgroundColor: '#42456C !important',
    background: `no-repeat url(${mw})`,
    backgroundSize: `cover`,
    position: 'relative',
  },
  particles_content: {
    ...theme.typography,
    bottom: '6%',
    width: '100%',
    position: 'absolute',
    textAlign: 'center',
    color: '#ffffff',
    '& h1': {
      fontSize: '6rem',
    },
    '& p': {
      fontSize: '2rem',
      margin: '0 0 1rem',
    },
  },
  button: {
    margin: theme.spacing.unit,
  },
  outlined: {
    borderColor: '#fff',
    color: '#fff',
    // backgroundColor: 'rgba(0, 0, 0, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
  },
})

class Layout extends React.Component {
  state = {
    drawerOpen: false,
    particlesHeight: 0,
  }
  componentDidMount() {
    this.setState({ particlesHeight: window.innerHeight })
  }
  render() {
    const { children, classes, data } = this.props
    const { particlesHeight } = this.state
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
            open={this.state.drawerOpen}
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
            open={this.state.drawerOpen}
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
        <div ref="content" className={classes.content}>
          <div className={classes.particles}>
            {particlesHeight && (
              <Particles
                ref="particles"
                params={particles}
                styles={classes.particles_canvas}
                height={particlesHeight}
              />
            )}
            <span className={classes.particles_content}>
              <h1>Nikita</h1>
              <p>{'Automation and deployment solution for Node.js'}</p>
              <p>{'Deploy distributed apps and infrastructures'}</p>
              <Link to="/">
                <Button
                  size="large"
                  variant="outlined"
                  className={classes.button}
                  classes={{ outlined: classes.outlined }}
                >
                  {'Get started'}
                </Button>
              </Link>
              <Link to="/">
                <Button
                  size="large"
                  variant="outlined"
                  className={classes.button}
                  classes={{ outlined: classes.outlined }}
                >
                  {'New in 0.x.x'}
                </Button>
              </Link>
            </span>
          </div>
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
