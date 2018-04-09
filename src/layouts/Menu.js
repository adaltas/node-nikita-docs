import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

import Link from "gatsby-link";

import Collapse from 'material-ui/transitions/Collapse';
import List from 'material-ui/List';
import { ListItem, ListItemText } from 'material-ui/List';
import { MenuList, MenuItem } from 'material-ui/Menu';

import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';

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
    '& $primary, & $icon': {
      color: theme.link.normal,
    },
  },
  active: {
    color: theme.link.normal,
  },
});

class NestedList extends React.Component {
  state = { open: true };
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };
  render() {
    const { classes, theme, menu } = this.props;
    const pages = menu.map( (page) => (
      <MenuItem
        component={Link}
        key={page.fields.slug}
        to={page.fields.slug}
        activeClassName={classes.active}
        className={classNames(classes.link, classes.leaf)}
      >
        {page.frontmatter.title}
      </MenuItem>
    ))
    return (
      <div>
        <MenuList
          component="nav"
        >
          <MenuItem component='div' onClick={this.handleClick}>
            <ListItemText primary="Inbox" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </MenuItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <MenuList component='ul' disablePadding>
              {pages}
            </MenuList>
          </Collapse>
        </MenuList>
      </div>
    );
  }
}
NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(NestedList);
