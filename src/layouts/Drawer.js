import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import DraftsIcon from 'material-ui-icons/Drafts';
// import IconButton from 'material-ui/IconButton';
// import MenuIcon from 'material-ui-icons/Menu';

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
  },
  list: {}
});

const PersistentDrawer = ({ classes, open, menu }) => {
  const anchor = 'left';
  // const open = true;
  const pages = menu.map( page =>
      <ListItem key={ page.path } button>
        <ListItemText primary={ page.title } />
      </ListItem>
  )
  return (
    <Drawer
      variant="persistent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor={anchor}
      open={open}
    >
      <div className={classes.drawerInner}>
        <Divider />
        <List className={classes.list}>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Element 1" />
          </ListItem>
        </List>
        <Divider />
        <List className={classes.list}>
        {pages}
        </List>
      </div>
    </Drawer>
  )
}
PersistentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  menu: PropTypes.array.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawer);

