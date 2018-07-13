import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import classnames from 'classnames'
// Material UI
import Button from '@material-ui/core/Button'
import withWidth, { isWidthDown, isWidthUp } from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
// Gatsby
import {Link} from 'gatsby'
// Particles
import Particles from 'react-particles-js'
import particles from './particles'
import mw from './milky-way-dark.jpg'

const styles = theme => ({
  root: {
    // backgroundColor: '#42456C !important',
    background: `no-repeat url(${mw})`,
    backgroundSize: `cover`,
    position: 'relative',
    '& h1': {
      fontSize: '6rem',
      margin: '0 0 1rem',
    },
    '& p': {
      fontSize: '2rem',
      margin: '0 0 .5rem',
    },
  },
  mobile: {
    '& h1': {
      fontSize: '3rem !important',
    },
    '& p': {
      fontSize: '1rem !important',
      margin: '0 0 .5rem !important',
    },
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
  state = {
    particlesHeight: 0,
  }
  componentDidMount() {
    this.setState({ particlesHeight: window.innerHeight })
  }
  render() {
    const { classes, width, theme } = this.props
    const { particlesHeight } = this.state
    const isMobile = isWidthDown('sm', width)
    return (
      <div className={classnames(classes.root, isMobile && classes.mobile)}>
        {particlesHeight && (
          <Particles
            ref="particles"
            params={particles}
            styles={classes.particles_canvas}
            height={particlesHeight}
          />
        )}
        <span className={classes.content}>
          <h1>Nikita</h1>
          <div className={classes.headlines}>
            <p>{'Automation and deployment solution '}</p>
            <p>{'Built for Node.js'}</p>
            <p>{'Deploy apps and infrastructures'}</p>
          </div>
          <Link to="/">
            <Button
              size="large"
              variant="outlined"
              className={classes.button}
              classes={{ outlined: classes.outlined }}
            >
              {'Get started'}
            </Button>
          </Link>
          <Link to="/">
            <Button
              size="large"
              variant="outlined"
              className={classes.button}
              classes={{ outlined: classes.outlined }}
            >
              {'New in 0.x.x'}
            </Button>
          </Link>
        </span>
      </div>
    )
  }
}

// export default withStyles(styles, { withTheme: true })(Intro)
export default withWidth()(withStyles(styles, { withTheme: true })(Intro))
