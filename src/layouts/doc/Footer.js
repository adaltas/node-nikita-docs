// React
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
// Material UI
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
// Gatsby
import Link from 'gatsby-link'
// Local
import withRoot from '../mui/withRoot'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#000"
  },
  rootInner: theme.mixins.gutters({
    ...theme.typography,
    flex: '1 1 100%',
    maxWidth: '100%',
    margin: '0 auto',
  }),
  [theme.breakpoints.up(900 + theme.spacing.unit * 6)]: {
    rootInner: {
      maxWidth: 900,
    },
  },
  subheading: {
    color: '#CCC8C7'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'justify',
    color: '#CCC8C7',
  },
  ul: {
    margin: '1rem 0',
    padding: 0,
    listStyle: 'none',
    color: '#CCC8C7',
    '& li': {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
    '& a': {
      color: '#fff',
      textDecoration: 'none',
    },
    '& a:hover': {
      color: theme.link.normal,
    },
  },
  content: {
    margin: '1rem 0',
    color: '#CCC8C7',
    '& a': {
      color: '#fff',
      textDecoration: 'none',
    },
    '& a:hover': {
      color: theme.link.normal,
    },
  },
})

class Footer extends Component {
  render() {
    const { classes, site } = this.props
    const footer = site.footer.map( (footer, i) => {
      const list = footer.links && (
        <ul className={classes.ul}>
          {(footer.links.map( (link, j) => (
            <li key={'footer'+i+'-'+j}>
              {(
              /^http/.test(link.url)
              ? <a href={link.url}>{link.label}</a>
              : <Link to={link.url}>{link.label}</Link>
              )}
            </li>
          )))}
        </ul>
      )
      const content  = footer.content && (
        <Typography className={classes.content} dangerouslySetInnerHTML={{ __html: footer.content }} />
      )
      return (
        <Grid key={'footer'+i} item xs={4}>
          <div className={classes.paper}>
            <Typography variant="subheading" className={classes.subheading}>{footer.title}</Typography>
            {list}
            {content}
          </div>
        </Grid>
      )
    })
    return (
      <footer className={classes.root}>
        <div className={classes.rootInner}>
          <Grid container spacing={0}>
          {footer}
          </Grid>
        </div>
      </footer>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Footer)
