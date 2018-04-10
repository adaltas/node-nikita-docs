import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import 'typeface-roboto'
import { withStyles } from 'material-ui/styles';
import withRoot from './mui/withRoot';
import NProgressBar from '@material-ui/docs/NProgressBar';
import Hidden from 'material-ui/Hidden';

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
  },
});

class AppFrame extends React.Component {
  state = {
    drawerOpen: true,
  }
  render() {
    const { children, classes, data} = this.props;
    const site = data.site.siteMetadata;
    const menuAbout = this.props.data.about.edges.map( edge => { return edge.node } )
    const menuUsages = this.props.data.usages.edges.map( edge => { return edge.node } )
    const menuOptions = this.props.data.options.edges.map( edge => { return edge.node } )
    const onToggle = () => {
      this.setState({'drawerOpen': !this.state.drawerOpen})
    }
    const updateLayoutFunction = (data) => {
      // Exemple on how to pass data from the page to the layout
    };
    return (
      <div className={classes.root}>
        <NProgressBar />
        <Helmet
          title={site.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <Hidden mdUp>
          <AppBar onMenuClick={onToggle} title={site.title} />
        </Hidden>
        <Hidden smDown implementation="css">
          <AppBar open={this.state.drawerOpen} onMenuClick={onToggle} title={site.title} />
        </Hidden>
        <Hidden mdUp>
          <Drawer open={!this.state.drawerOpen} onClickShadow={onToggle} variant="temporary">
            <Menu title='About' menu={menuAbout} path={this.state.path}></Menu>
            <Menu title='Usages' menu={menuUsages} path={this.state.path}></Menu>
            <Menu title='Options' menu={menuOptions} path={this.state.path}></Menu>
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer open={this.state.drawerOpen} onClickShadow={onToggle} variant="persistent">
            <Menu title='About' menu={menuAbout} path={this.state.path}></Menu>
            <Menu title='Usages' menu={menuUsages} path={this.state.path}></Menu>
            <Menu title='Options' menu={menuOptions} path={this.state.path}></Menu>
          </Drawer>
        </Hidden>
        <Content>{children({...this.props, updateLayoutFunction})}</Content>
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
  query drawerMenu {
    site: site {
      siteMetadata {
        title
      }
    }
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
    options: allMarkdownRemark(filter:{ fields: { slug: { regex: "/^\/options\//" } } }, sort: { order: DESC, fields: [frontmatter___sort] }) {
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
