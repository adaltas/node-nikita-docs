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
import { FaGithub } from 'react-icons/fa';
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import SvgIcon from '@material-ui/core/SvgIcon'
// Gatsby
import { Link } from 'gatsby'
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
  logo: {
    fontSize: '1.6rem',
    marginLeft: '.5rem',
  },
  title: {
    color: 'rgba(255,255,255,1)',
    display: 'inline-block',
    fontSize: '2rem',
    fontWeight: 'bold',
    letterSpacing: '.3rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    marginTop: '.5rem',
    borderRadius: '5px',
    textTransform: 'uppercase',
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      backgroundColor: 'rgba(255,255,255, 0.15)',
      transition: theme.transitions.create('background-color', {
        duration: theme.transitions.duration.shortest,
      }),
    },
  },
  grow: {
    flex: '1 1 auto',
  },
  icon: {
    '&:hover': {
      backgroundColor: 'rgba(255,255,255, 0.15)',
      transition: theme.transitions.create('background-color', {
        duration: theme.transitions.duration.shortest,
      }),
    },
  },
})

class MyAppBar extends Component {
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
            className={classes.icon}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <Typography className={classes.title} color="inherit" noWrap>
              {site.title}
              <SvgIcon className={classes.logo}>
                <g>
                  <path d=" M 7.307 6.867 L 10.46 6.867 C 10.703 6.867 10.9 7.064 10.9 7.307 L 10.9 12.293 C 10.9 12.536 11.097 12.733 11.34 12.733 L 14.86 12.733 C 15.103 12.733 15.3 12.93 15.3 13.173 L 15.3 18.16 C 15.3 18.403 15.103 18.6 14.86 18.6 L 7.307 18.6 C 7.064 18.6 6.867 18.403 6.867 18.16 L 6.867 7.307 C 6.867 7.064 7.064 6.867 7.307 6.867 Z " />
                  <path d=" M 12.367 4.373 L 12.367 10.827 C 12.367 11.07 12.564 11.267 12.807 11.267 L 18.16 11.267 C 18.403 11.267 18.6 11.07 18.6 10.827 L 18.6 4.373 C 18.6 4.13 18.403 3.933 18.16 3.933 L 12.807 3.933 C 12.564 3.933 12.367 4.13 12.367 4.373 Z " />
                  <path d=" M 16.767 14.64 L 16.767 19.627 C 16.767 19.87 16.57 20.067 16.327 20.067 L 11.34 20.067 C 11.097 20.067 10.9 20.264 10.9 20.507 L 10.9 22.56 C 10.9 22.803 11.097 23 11.34 23 L 19.26 23 C 19.503 23 19.7 22.803 19.7 22.56 L 19.7 14.64 C 19.7 14.397 19.503 14.2 19.26 14.2 L 17.207 14.2 C 16.964 14.2 16.767 14.397 16.767 14.64 Z " />
                  <path d=" M 9.8 20.507 L 9.8 21.093 C 9.8 21.336 9.603 21.533 9.36 21.533 L 4.373 21.533 C 4.13 21.533 3.933 21.336 3.933 21.093 L 3.933 14.64 C 3.933 14.397 4.13 14.2 4.373 14.2 L 4.96 14.2 C 5.203 14.2 5.4 14.397 5.4 14.64 L 5.4 19.627 C 5.4 19.87 5.597 20.067 5.84 20.067 L 9.36 20.067 C 9.603 20.067 9.8 20.264 9.8 20.507 Z " />
                  <path d=" M 5.4 8.773 L 5.4 12.293 C 5.4 12.536 5.203 12.733 4.96 12.733 L 1.44 12.733 C 1.197 12.733 1 12.536 1 12.293 L 1 8.773 C 1 8.53 1.197 8.333 1.44 8.333 L 4.96 8.333 C 5.203 8.333 5.4 8.53 5.4 8.773 Z " />
                  <path d=" M 10.093 3.933 L 8.04 3.933 C 7.797 3.933 7.6 3.736 7.6 3.493 L 7.6 1.44 C 7.6 1.197 7.797 1 8.04 1 L 10.093 1 C 10.336 1 10.533 1.197 10.533 1.44 L 10.533 3.493 C 10.533 3.736 10.336 3.933 10.093 3.933 Z " />
                  <path d=" M 20.067 5.84 L 20.067 7.893 C 20.067 8.136 20.264 8.333 20.507 8.333 L 22.56 8.333 C 22.803 8.333 23 8.136 23 7.893 L 23 5.84 C 23 5.597 22.803 5.4 22.56 5.4 L 20.507 5.4 C 20.264 5.4 20.067 5.597 20.067 5.84 Z " />
                </g>
              </SvgIcon>
            </Typography>
          </Link>
          <div className={classes.grow} />
          <Tooltip id="appbar-bug" title={site.issues.title} enterDelay={300}>
            <IconButton
              color="inherit"
              href={site.issues.url}
              aria-labelledby="appbar-bug"
              className={classes.icon}
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
              className={classes.icon}
            >
              <FaGithub />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles, { withTheme: true })(MyAppBar)
