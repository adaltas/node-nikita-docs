import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

import Link from 'gatsby-link'

import Collapse from '@material-ui/core/Collapse'
import Button from '@material-ui/core/Button'
import ListItemText from '@material-ui/core/ListItemText'
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
  handleClick = () => {
    this.setState({ open: !this.state.open })
  }
  render() {
    const { classes, menu } = this.props
    const pages = Object.values(menu.children)
    .sort( page => page.data.sort )
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
          <MenuItem component="div">
            <ListItemText primary={menu.data.title} onClick={this.handleClick} />
            <Button size="small" onClick={this.handleClick}>
              {this.state.open ? <ExpandLess/> : <ExpandMore/>}
            </Button>
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
