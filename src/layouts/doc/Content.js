import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import classNames from 'classnames'

require('prismjs/themes/prism-tomorrow.css')

const styles = theme => ({
  content: theme.mixins.gutters({
    ...theme.typography,
    paddingTop: 100,
    flex: '1 1 100%',
    maxWidth: '100%',
    margin: '0 auto 3rem',
    '& a': {
      textDecoration: 'none',
      '&:visited': {
        color: '#00618E',
      },
      '&:hover': {
        textDecoration: 'none',
        color: theme.link.normal,
      },
      // '&:active': {
      //   color: '#000',
      // },
    },
    '& h1': {
      color: '#777777',
      fontWeight: 'normal',
    },
    '& h2': {
      color: '#777777',
      fontWeight: 'normal',
    },
    '& h3': {
      color: '#777777',
      fontWeight: 'normal',
    },
    '& em': {
      color: '#2D2D2D',
    },
    '& p': {
      color: '#2D2D2D',
      textAlign: 'justify'
    },
    '& li': {
      color: '#2D2D2D',
      textAlign: 'justify'
    },
  }),
  [theme.breakpoints.up(900 + theme.spacing.unit * 6)]: {
    content: {
      maxWidth: 900,
    },
  },
})

const Content = ({ classes, children, theme }) => (
  <main className={classNames(classes.content)}>{children}</main>
)

Content.propTypes = {
  children: PropTypes.node.isRequired,
}

export default withStyles(styles, { withTheme: true })(Content)
