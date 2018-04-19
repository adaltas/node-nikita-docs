import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import 'typeface-roboto'
import { withStyles } from 'material-ui/styles'
import classNames from 'classnames'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'

import Drawer from './doc/Drawer'

import './index.css'

const drawerWidth = 240

const styles = {
  root: {
    width: '100%',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    // zIndex: theme.zIndex.navDrawer + 1,
    // transition: theme.transitions.create(['width', 'margin'], {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.leavingScreen,
    // }),
  },
  flex: {
    flex: 1,
  },
  drawer: {
    width: drawerWidth,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBarShift: {
    marginLeft: `${drawerWidth}px`,
    width: `calc(100% - ${drawerWidth}px)`,
    // transition: theme.transitions.create(['margin', 'width'], {
    //   easing: theme.transitions.easing.easeOut,
    //   duration: theme.transitions.duration.enteringScreen,
    // }),
  },
  content: {
    margin: '0 auto',
    maxWidth: 960,
    padding: '0px 1.0875rem 1.45rem',
  },
  contentShift: {
    marginLeft: drawerWidth,
  },
}

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

class TemplateWrapper extends React.Component {
  state = {
    menuOpen: false,
  }
  onClickMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen })
  }
  render() {
    const { children, classes } = this.props
    const menu = this.props.data.allMarkdownRemark.edges.map(edge => {
      return { path: edge.node.fields.slug, title: edge.node.frontmatter.title }
    })
    return (
      <div className={classes.appFrame}>
        <Helmet
          title="Gatsby Default Starter"
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <HeaderStyled
          onClickMenu={this.onClickMenu}
          menuOpen={this.state.menuOpen}
        />
        <Drawer
          className={classes.drawer}
          open={this.state.menuOpen}
          menu={menu}
        />
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: this.state.menuOpen,
          })}
        >
          {children()}
        </main>
      </div>
    )
  }
}
TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default withStyles(styles)(TemplateWrapper)

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___sort] }) {
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
