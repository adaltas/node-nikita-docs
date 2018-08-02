// React
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
// Material UI
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
// Gatsby
import {Link} from 'gatsby'

const styles = theme => ({
  toolbar: {
    ...theme.mixins.toolbar,
    paddingLeft: theme.spacing.unit * 2,
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& a': {
      textDecoration: 'none',
      color: theme.typography.title.color,
    },
  },
  drawer: {
    width: 0,
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
  footer: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    borderTop: '1px solid rgb(200, 200, 200)',
    marginTop: '20px',
    padding: '20px 0',
    backgroundColor: 'rgb(245, 245, 245)',
    textAlign: 'justify',
    '& a': {
      textDecoration: 'none',
      color: theme.typography.title.color,
    },
  }
})

class AppDrawer extends React.Component {
  render() {
    const { classes, open, children, onClickShadow, variant } = this.props
    return (
      <Drawer
        className={classNames(classes.drawer, { [classes.drawerShift]: open })}
        classes={{
          paper: classNames(classes.paper),
        }}
        variant={variant}
        anchor="left"
        open={open}
        onClose={onClickShadow}
      >
        <div className={classes.nav}>
          <div className={classes.toolbar}>
            <Link to="/">
              <Typography variant="title" color="inherit">
                Documentation
              </Typography>
            </Link>
            <Typography variant="caption">{'version 0.7'}</Typography>
          </div>
          <Divider />
        </div>
        {children}
        <Typography className={classes.footer} variant="caption">
          Help us <a href="https://github.com/adaltas/node-nikita-docs/issues" target="_blank" rel="noopener">improve the docs</a> by
          fixing typos and proposing enhancements.
        </Typography>
      </Drawer>
    )
  }
}
AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(AppDrawer)
