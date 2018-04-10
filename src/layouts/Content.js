import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles'
import classNames from 'classnames'

const styles = theme => ({
  content: theme.mixins.gutters({
    ...theme.typography,
    paddingTop: 100,
    flex: '1 1 100%',
    maxWidth: '100%',
    margin: '0 auto',
  }),
  [theme.breakpoints.up(900 + theme.spacing.unit * 6)]: {
    content: {
      maxWidth: 900,
    },
  },
})

const Content = ({ classes, children }) => (
  <div className={classNames(classes.content)}>{children}</div>
)

Content.propTypes = {
  children: PropTypes.node.isRequired,
}

export default withStyles(styles, { withTheme: true })(Content)
