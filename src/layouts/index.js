import React from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import 'typeface-roboto'

import { withStyles } from 'material-ui/styles'
import withRoot from './mui/withRoot'
import NProgressBar from '@material-ui/docs/NProgressBar'
import Hidden from 'material-ui/Hidden'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

import AppBar from './doc/AppBar'
import Content from './doc/Content'
import Drawer from './doc/Drawer'
import Footer from './doc/Footer'
import Menu from './doc/Menu'
// Gatsby
import Link from 'gatsby-link'
// Particles
import Particles from 'react-particles-js';
import particles from './home/particles';
import mw from './home/milky-way.jpg'

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
    }
  },
  button: {
    color: '#ffffff',
    margin: theme.spacing.unit,
    // background: 'rgba(255, 255, 255, .2)'
    background: 'rgba(0, 0, 0, .5)',
    '&:hover': {
      background: 'rgba(0, 0, 0, .5)',
    }
  }
})

const Header = ({ classes, onClickMenu, menuOpen }) => (
  <AppBar
    position="static"
    className={classNames(classes.appBar, { [classes.appBarShift]: menuOpen })}
  >
    <Toolbar>
      <IconButton
        onClick={onClickMenu}
        className={classes.menuButton}
        color="inherit"
        aria-label="Menu"
      >
        <MenuIcon />
      </IconButton>
      <Typography type="title" color="inherit" className={classes.flex}>
        Title
      </Typography>
      <Button color="inherit">Login</Button>
    </Toolbar>
  </AppBar>
)
Header.propTypes = {
  classes: PropTypes.object.isRequired,
}
const HeaderStyled = withStyles(styles)(Header)

class AppFrame extends React.Component {
  state = {
    drawerOpen: false,
    particlesHeight: 0,
  }
  componentDidMount() {
    this.setState({particlesHeight: window.innerHeight})
  }
  render() {
    const { children, classes, data } = this.props
    const { particlesHeight } = this.state
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
        <NProgressBar />
        <Helmet
          title={site.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <Hidden mdUp>
          <AppBar
            ref={(child) => { this.appbar = child }}
            onMenuClick={onToggle}
            site={site}
            opacity={.3}
          />
        </Hidden>
        <Hidden smDown implementation="css">
          <AppBar
            ref={(child) => { this.appbar = child }}
            open={this.state.drawerOpen}
            onMenuClick={onToggle}
            site={site}
            opacity={.3}
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
        <div ref='content' className={classes.content}>
          <div className={classes.particles}>
            { particlesHeight &&
              <Particles 
                ref="particles"
                params={particles}
                styles={classes.particles_canvas}
                height={particlesHeight}
              />
            }
            <span className={classes.particles_content}>
              <h1>Nikita</h1>
              <p>{'Write, test, version, configure and deploy in Node.js'}</p>
              <Link to="/">
                <Button size="large" variant="outlined" className={classes.button}>
                  {'Get started'}
                </Button>
              </Link>
              <Link to="/">
                <Button size="large" variant="outlined" className={classes.button}>
                  {'New in 0.x.x'}
                </Button>
              </Link>
            </span>
          </div>
          <Content>{children()}</Content>
          <Footer site={site}></Footer>
        </div>
      </div>
    )
  }
}
AppFrame.propTypes = {
  children: PropTypes.func,
  data: PropTypes.object.isRequired,
}

export default withRoot(withStyles(styles, { withTheme: true })(AppFrame))

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
