// React
import React, { Component } from 'react'
import ReactDom from 'react-dom'
import classNames from 'classnames'
// Material UI
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import MenuIcon from '@material-ui/icons/Menu'
import BugReportOutlined from '@material-ui/icons/BugReportOutlined'
import Github from '@material-ui/docs/svgIcons/GitHub'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
// Gatsby
import {Link} from 'gatsby'
// Local
// import header from './header.png'

const styles = theme => ({
  appBar: {
    left: 0,
    right: 0,
    '@media print': {
      position: 'absolute',
    },
    backgroundColor: 'rgba(18, 24, 47, 1)',
  },
  appBarShift: {
    left: 250,
    right: 0,
    width: 'auto',
    transition: theme.transitions.create('left', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    color: '#fff',
    display: 'inline-block',
    fontSize: '2rem',
    fontWeight: 'bold',
    letterSpacing: '.3rem',
    textShadow: '0 0 0.4rem rgba(255,255,255, 0.15)',
    textTransform: 'uppercase',
  },
  grow: {
    flex: '1 1 auto',
  },
})

class MyAppBar extends Component {
  state = {
    toto: 50,
  }
  static defaultProps = {
    opacity: 1,
  }
  componentDidMount() {
    const { opacity } = this.props
    if (opacity !== 1) {
      window.addEventListener('scroll', this.handleScroll.bind(this))
      this.handleScroll()
    }
  }
  componentWillUnmount() {
    const { opacity } = this.props
    if (opacity !== 1) {
      window.removeEventListener('scroll', this.handleScroll.bind(this))
    }
  }
  handleScroll(event) {
    const scrollTop = window.scrollY,
      opacity = Math.max(
        this.props.opacity,
        Math.floor((Math.min(window.innerHeight, scrollTop) / 4) * 100) / 10000
      ),
      appbarNode = ReactDom.findDOMNode(this.refs.appbar)
    if (appbarNode) {
      appbarNode.style.backgroundColor = 'rgba(18, 24, 47, ' + opacity + ')'
    }
  }
  render() {
    const { classes, open, onMenuClick, site } = this.props
    return (
      <AppBar
        ref="appbar"
        className={classNames(classes.appBar, { [classes.appBarShift]: open })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <Typography className={classes.title} color="inherit" noWrap>
              {site.title}
            </Typography>
          </Link>
          <div className={classes.grow} />
          <Tooltip id="appbar-theme" title={site.issues.title} enterDelay={300}>
            <IconButton
              color="inherit"
              href={site.issues.url}
              aria-labelledby="appbar-theme"
            >
              <BugReportOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip
            id="appbar-github"
            title={site.github.title}
            enterDelay={300}
          >
            <IconButton
              color="inherit"
              href={site.github.url}
              aria-labelledby="appbar-github"
            >
              <Github />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles, { withTheme: true })(MyAppBar)
