// React
import React from 'react'
import Helmet from 'react-helmet'
// Material UI
import { withStyles } from '@material-ui/core/styles'
import withRoot from './mui/withRoot'
import Hidden from '@material-ui/core/Hidden'
import 'typeface-roboto'
// Gatsby
import { StaticQuery, graphql } from 'gatsby'
// Local
import AppBar from './shared/AppBar'
import Content from './shared/Content'
import Drawer from './shared/Drawer'
import Nav from './shared/Nav'
import Footer from './shared/Footer'
import Menu from './shared/Menu'
import Intro from './home/Intro'

const styles = theme => ({
  root: {
  },
  content: {
    marginLeft: 0,
  },
})

class Layout extends React.Component {
  state = {
    open: false,
    breakpoint: 960,
  }
  render() {
    const { children, classes, data } = this.props
    const site = data.site.siteMetadata
    const onToggle = () => {
      this.setState({ open: !this.state.open })
    }
    const handleClickLink = () => {
      if(window.innerWidth < this.state.breakpoint){
        this.setState({ open: false })
      }
    }
    const menu = { children: {} }
    data.menu.edges.map(edge => {
      const slugs = edge.node.fields.slug.split('/').filter(part => part)
      let parentMenu = menu
      slugs.map(slug => {
        if (!parentMenu.children[slug])
          parentMenu.children[slug] = { data: {}, children: {} }
        parentMenu = parentMenu.children[slug]
      })
      parentMenu.data = {
        id: slugs.join('/'),
        title: edge.node.frontmatter.title,
        slug: edge.node.fields.slug,
        sort: edge.node.frontmatter.sort || 99,
      }
    })
    return (
      <div className={classes.root}>
        <Helmet
          title={site.title}
          meta={[
            { name: 'description', content: site.description },
            { name: 'keywords', content: site.keywords },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Drawer
          breakpoint={this.state.breakpoint}
          open={this.state.open}
          onClickModal={onToggle}
          main={
            <>
              <AppBar
                open={this.state.open}
                onMenuClick={onToggle}
                site={site}
                opacity={0.3}
              />
              <div className={classes.content}>
                <Intro />
                <Content>{children}</Content>
                <Footer site={site} />
              </div>
            </>
          }
          drawer={
            <Menu>
              {Object.values(menu.children)
              .sort((p1, p2) => p1.data.sort > p2.data.sort)
              .map(page => (
                <Nav
                  key={page.data.slug}
                  menu={page}
                  path={this.state.path}
                  onClickLink={handleClickLink}
                />
              ))}
            </Menu>
          }
        />
      </div>
    )
  }
}

const WrappedLayout = props => (
  <StaticQuery
    query={graphql`
      query IndexQuery {
        site: site {
          siteMetadata {
            title
            description
            github {
              url
              title
            }
            issues {
              url
              title
            }
            footer {
              title
              content
              links {
                label
                url
              }
              xs
              sm
            }
          }
        }
        menu: allMarkdownRemark(
          filter: {
            frontmatter: { disabled: { eq: false } }
            fields: { slug: { regex: "/^/.+/" } }
          }
          sort: { order: ASC, fields: [frontmatter___sort, fields___slug] }
        ) {
          edges {
            node {
              id
              excerpt(pruneLength: 250)
              frontmatter {
                title
                sort
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `}
    render={data => <Layout data={data} {...props} />}
  />
)

export default withRoot(withStyles(styles, { withTheme: true })(WrappedLayout))
