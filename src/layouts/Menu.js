import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

import Link from "gatsby-link";

import Collapse from 'material-ui/transitions/Collapse';
import List from 'material-ui/List';
import { ListItem, ListItemText } from 'material-ui/List';

import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';

const styles = theme => ({
  leaf: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  active: {
    color: theme.palette.primary.main,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.link.normal,
    '&:hover': {
      textDecoration: 'none',
    },
  }
});

class NestedList extends React.Component {
  state = { open: true };
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };
  render() {
    const { classes, theme, menu } = this.props;
    const pages = menu.map( (page) => (
      <ListItem focusRipple={false} disableRipple={false} dense button component={Link} to={page.fields.slug} activeClassName={classes.active} className={classNames(classes.leaf)}>
        <ListItemText disableTypography={false}>
          {page.frontmatter.title}
        </ListItemText>
      </ListItem>
    ))
    return (
      <div>
        <List
          component="nav"
        >
          <ListItem button onClick={this.handleClick}>
            <ListItemText primary="Inbox" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {pages}
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}
NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(NestedList);
