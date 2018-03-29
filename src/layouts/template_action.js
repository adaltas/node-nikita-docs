import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import mixme from 'mixme'

import 'typeface-roboto'
import { withStyles } from 'material-ui/styles';
import withRoot from './mui/withRoot';
import classNames from 'classnames';

import header from "./header.png";
import Drawer from 'material-ui/Drawer';
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import MenuIcon from 'material-ui-icons/Menu';
import LightbulbOutline from 'material-ui-icons/LightbulbOutline';
import Github from '@material-ui/docs/svgIcons/GitHub';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: '100vh',
    width: '100%',
    // marginLeft: 250,
  },
  grow: {
    flex: '1 1 auto',
  },
  appBar: {
    left: 0,
    right: 0,
    '@media print': {
      position: 'absolute',
    },
    backgroundColor: '#000 !important',
    // backgroundImage: 'url("layouts/header.png") !important',
    backgroundImage: `url(${header}) !important`,
    // background-size: 100% auto;
    backgroundSize: 'contain !important',
    backgroundAttachment: 'fixed !important',
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
    color: '#bc1b00',
    display: 'inline-block',
    fontSize: '2rem',
    fontWeight: 'bold',
    letterSpacing: '.3rem',
    textShadow: '0 0 0.4rem rgba(255,255,255, 0.15)',
    textTransform: 'uppercase',
  },
  // main: {
  //   position: 'relative',
  //   marginLeft: 0,
  // },
  // mainShift: {
  //   marginLeft: 250,
  //   transition: theme.transitions.create('margin-left', {
  //     easing: theme.transitions.easing.easeOut,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // },
  drawer: {
    // width: 250,
  },
  drawerShift: {
    width: 250,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  paper: {
    width: 250,
    // left: 0,
    // backgroundColor: theme.palette.background.paper,
  },
  content: mixme(theme.typography, theme.mixins.gutters({
    paddingTop: 100,
    flex: '1 1 100%',
    maxWidth: '100%',
    margin: '0 auto',
  })),
  [theme.breakpoints.up(900 + theme.spacing.unit * 6)]: {
    content: {
      maxWidth: 900,
    },
  },
});

class AppFrame extends React.Component {
  state = {
    drawerOpen: true
  }
  render() {
    const { children, classes} = this.props;
    const onToggle = () => {
      this.setState({'drawerOpen': !this.state.drawerOpen})
    }
    return (
      <div className={classes.root}>
        <Helmet
          title="Gatsby Default Starter"
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <AppBar className={classNames(classes.appBar, {[classes.appBarShift]: this.state.drawerOpen})}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={onToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} color="inherit" noWrap>
              Nikita
            </Typography>
            <div className={classes.grow} />
            <Tooltip id="appbar-theme" title="Toggle light/dark theme" enterDelay={300}>
              <IconButton
                color="inherit"
                onClick={null}
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
        <Drawer
          className={classNames(classes.drawer, {[classes.drawerShift]: this.state.drawerOpen})}
          classes={{
            paper: classNames(classes.paper),
          }}
          onBackdropClick={onToggle}
          onClose={null}
          variant="persistent"
          anchor="left"
          open={this.state.drawerOpen}
        >
          ok<br/>
          ok<br/>
          ok<br/>
          ok<br/>
          ok<br/>
          ok<br/>
          ok<br/>
          ok<br/>
          ok<br/>
          ok<br/>
          ok<br/>
          ok<br/>
          ok<br/>
          ok<br/>
          ok<br/>
          ok<br/>
          ok<br/>
          ok<br/>
          ok<br/>
          ok<br/>
          ok<br/>
          ok<br/>
          ok<br/>
          ok<br/>
        </Drawer>
        <div className={classNames(classes.content)}>
          {children()}
        </div>
      </div>
    )
  }

}
AppFrame.propTypes = {
  children: PropTypes.func,
}

export default withRoot(withStyles(styles, { withTheme: true })(AppFrame));
