
// React
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames';
// Material UI
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import MenuIcon from 'material-ui-icons/Menu';
import LightbulbOutline from 'material-ui-icons/LightbulbOutline';
import Github from '@material-ui/docs/svgIcons/GitHub';
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography';
// Gatsby
import Link from 'gatsby-link'
// Local
import header from "./header.png";;
import withRoot from './mui/withRoot';

const styles = theme => ({
  appBar: {
    left: 0,
    right: 0,
    '@media print': {
      position: 'absolute',
    },
    backgroundColor: '#000 !important',
    backgroundImage: `url(${header}) !important`,
    backgroundSize: 'contain !important',
    backgroundAttachment: 'fixed !important',
    // transition: theme.transitions.create('width'),
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
});

class MyAppBar extends React.Component {
  
  render () {
    const {classes, open, onMenuClick, title} = this.props;
    return (
      <AppBar className={classNames(classes.appBar, {[classes.appBarShift]: open})}>
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
              {title}
            </Typography>
          </Link>
          <div className={classes.grow} />
          <Tooltip id="appbar-theme" title="Toggle light/dark theme" enterDelay={300}>
            <IconButton
              color="inherit"
              onClick={onMenuClick}
              aria-labelledby="appbar-theme"
            >
              <LightbulbOutline />
            </IconButton>
          </Tooltip>
          <Tooltip id="appbar-github" title="Material-UI GitHub repo" enterDelay={300}>
            <IconButton
              color="inherit"
              href="https://github.com/mui-org/material-ui"
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

export default withRoot(withStyles(styles, { withTheme: true })(MyAppBar));
