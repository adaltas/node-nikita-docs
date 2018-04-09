import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  toolbar: {
    ...theme.mixins.toolbar,
    paddingLeft: theme.spacing.unit * 3,
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
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
  },
});

class AppDrawer extends React.Component {
  render() {
    const { classes, open, menu, children } = this.props
    return (
      <Drawer
        className={classNames(classes.drawer, {[classes.drawerShift]: open})}
        classes={{
          paper: classNames(classes.paper),
        }}
        onClose={null}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <div className={classes.nav}>
          <div className={classes.toolbar}>
            <Typography variant="title" color="inherit">
              Documentation
            </Typography>
            <Typography variant="caption">version 0.6</Typography>
          </div>
          <Divider />
        </div>
        {children}
      </Drawer>
    )
  }
}
AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(AppDrawer);
