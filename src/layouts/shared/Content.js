import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

require('prismjs/themes/prism-tomorrow.css')

const styles = theme => ({
  content: theme.mixins.gutters({
    ...theme.typography,
    paddingTop: 40,
    flex: '1 1 100%',
    maxWidth: '100%',
    margin: '0 auto 3rem',
    '& a': {
      textDecoration: 'none',
      '&:link,&:visited': {
        color: '#00618E',
      },
      '&:hover': {
        textDecoration: 'none',
        color: theme.link.normal,
      },
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
    '& blockquote': {
      borderLeft: '3px solid #777777',
      margin: 0,
      paddingLeft: '40px',
    },
    '& blockquote p': {
      color: '#777777',
    },
    '& blockquote p > code[class*="language-"]': {
      color: '#646464',
    },
    '& p': {
      color: '#2D2D2D',
      textAlign: 'justify',
    },
    '& li': {
      color: '#2D2D2D',
      textAlign: 'justify',
    },
    '& :not(pre) > code[class*="language-"]': {
      padding: '.2em .3em 0 .3em',
      background: '#E6E6E6',
      color: '#000',
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
