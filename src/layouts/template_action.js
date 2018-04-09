import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import mixme from 'mixme'

import 'typeface-roboto'
import { withStyles } from 'material-ui/styles';
import withRoot from './mui/withRoot';

import Collapse from 'material-ui/transitions/Collapse';

import AppBar from './AppBar';
import Content from './Content'
import Drawer from './Drawer';
import Menu from './Menu';

require("prismjs/themes/prism-tomorrow.css");

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: '100vh',
    width: '100%',
    // marginLeft: 250,
  },
});

class AppFrame extends React.Component {
  state = {
    drawerOpen: true
  }
  render() {
    const { children, classes, data} = this.props;
    const menuAbout = this.props.data.about.edges.map( edge => { return edge.node } )
    const menuUsages = this.props.data.usages.edges.map( edge => { return edge.node } )
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
        <AppBar open={this.state.drawerOpen} onMenuClick={onToggle} />
        <Drawer open={this.state.drawerOpen}>
          <Menu title='About' menu={menuAbout}></Menu>
          <Menu title='Usages' menu={menuUsages}></Menu>
        </Drawer>
        <Content>{children()}</Content>
      </div>
    )
  }

}
AppFrame.propTypes = {
  children: PropTypes.func,
  data: PropTypes.object.isRequired,
}

export default withRoot(withStyles(styles, { withTheme: true })(AppFrame));

export const pageQuery = graphql`
  query templateActionMenu {
    about: allMarkdownRemark(filter:{ fields: { slug: { regex: "/^\/about\//" } } }, sort: { order: DESC, fields: [frontmatter___sort] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
    usages: allMarkdownRemark(filter:{ fields: { slug: { regex: "/^\/usages\//" } } }, sort: { order: DESC, fields: [frontmatter___sort] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
