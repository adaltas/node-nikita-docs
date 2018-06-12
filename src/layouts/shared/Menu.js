import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

import Link, { navigateTo } from 'gatsby-link'

import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'

import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

const styles = theme => ({
  leaf: {
    fontWeight: theme.typography.fontWeightLight,
    paddingTop: theme.spacing.unit / 3,
    paddingBottom: theme.spacing.unit / 3,
  },
  link: {
    ...theme.typography.caption,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
    '&:active': {
      color: theme.link.normal,
    },
    // '& $primary, & $icon': {
    //   color: theme.link.normal,
    // },
  },
  active: {
    color: theme.link.normal,
  },
})

class Menu extends React.Component {
  state = { open: true }
  handleClick = (e) => {
    // e.stopPropagation()
    this.setState({ open: !this.state.open })
    console.log('state', this.state.open)
  }
  navigate = (to) => {
    const { menu } = this.props
    navigateTo({
      pathname: menu.data.slug,
      state: {
        // showPage: true,
      }
    })
  }
  render() {
    const { classes, menu } = this.props
    const pages = Object.values(menu.children)
    .sort( (p1, p2) => p1.data.sort > p2.data.sort )
    .map( page => (
      <MenuItem
        component={Link}
        key={page.data.slug}
        to={page.data.slug}
        activeClassName={classes.active}
        className={classNames(classes.link, classes.leaf)}
      >
        {page.data.title}
      </MenuItem>
    ))
    return (
      <div>
        <MenuList component="nav">
          <MenuItem component={Link} to={menu.data.slug}>
            <ListItemText primary={menu.data.title} onClick={this.navigate} />
            <ListItemSecondaryAction>
              <IconButton onClick={this.handleClick}>
                {this.state.open ? <ExpandLess/> : <ExpandMore/>}
              </IconButton>
            </ListItemSecondaryAction>
          </MenuItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <MenuList component="ul" disablePadding>
              {pages}
            </MenuList>
          </Collapse>
        </MenuList>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Menu)
