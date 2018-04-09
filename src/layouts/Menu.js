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
    paddingTop: 2,
    paddingBottom: 2,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.link.normal,
    '&:hover': {
      textDecoration: 'none',
    },
  },
  active: {
    color: theme.palette.secondary.main,
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
        focusRipple={false}
        disableRipple={false}
        dense
        component={Link}
        to={page.fields.slug}
        className={classes.link}
        activeClassName={classes.active}
        className={classNames(classes.leaf)}
      >
        <ListItemText>
          {page.frontmatter.title}
        </ListItemText>
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
            <MenuList component='div' disablePadding>
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
