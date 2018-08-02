import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import classnames from 'classnames'
// Material UI
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
// Gatsby
import {Link} from 'gatsby'
// Particles
import Particles from 'react-particles-js'
import particles from './particles'
import mw_low from './milky-way-low.jpg'
import mw_high from './milky-way-high.jpg'

const styles = theme => ({
  root: {
    // backgroundColor: '#42456C !important',
    background: `no-repeat url(${mw_low})`,
    backgroundSize: `cover`,
    position: 'relative',
    height: '100vh',
    '& h1': {
      fontSize: '6rem',
      margin: '0 0 1rem',
    },
    '& p': {
      fontSize: '2rem',
      margin: '0 0 .5rem',
    },
    '@media (max-width: 600px)': {
      '& h1': {
        fontSize: '3rem !important',
      },
      '& p': {
        fontSize: '1rem !important',
        margin: '0 0 .5rem !important',
      },
    }
  },
  bck: {
    background: `no-repeat url(${mw_high})`,
    backgroundSize: `cover`,
    height: '100%'
  },
  content: {
    ...theme.typography,
    bottom: '6%',
    width: '100%',
    position: 'absolute',
    textAlign: 'center',
    color: '#ffffff',
  },
  button: {
    margin: theme.spacing.unit,
  },
  headlines: {
    margin: '0 0 2rem',
  },
  outlined: {
    borderColor: '#fff',
    color: '#fff',
    // backgroundColor: 'rgba(0, 0, 0, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
  },
})

class Intro extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classnames(classes.root)}>
        <Particles
          ref="particles"
          params={particles}
          className={classes.bck}
        />
        <span className={classes.content}>
          <h1>Nikita</h1>
          <div className={classes.headlines}>
            <p>{'Automation and deployment solution '}</p>
            <p>{'Built for Node.js, MIT License'}</p>
            <p>{'Deploy apps and infrastructures'}</p>
          </div>
          <Button
            component={Link}
            to="/about/tutorial"
            size="large"
            variant="outlined"
            className={classes.button}
            classes={{ outlined: classes.outlined }}
          >
            {'Get started'}
          </Button>
          <Button
            component={Link}
            to="/about/changelog"
            size="large"
            variant="outlined"
            className={classes.button}
            classes={{ outlined: classes.outlined }}
          >
            {'Changelog'}
          </Button>
        </span>
      </div>
    )
  }
}

// export default withStyles(styles, { withTheme: true })(Intro)
export default withStyles(styles, { withTheme: true })(Intro)
