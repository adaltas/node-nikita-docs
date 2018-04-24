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
    '& p': {
      textAlign: 'justify'
    },
    '& li': {
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
