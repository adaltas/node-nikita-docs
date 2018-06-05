import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Layout from '../layouts/index'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    //   height: 140,
    //   width: 100,
  },
  // control: {
  //   padding: theme.spacing.unit * 2,
  // },
})

class IndexPage extends React.Component {
  render() {
    const { classes, data } = this.props
    return (
      <div>
        <Grid container className={classes.root} spacing={24}>
          <Grid item xs={12} sm={6}>
            <h3>{'Consistent Usage'}</h3>
            <p>
              {
                'All the functions share the same API, accepting options and a user callback in a flexible manner. Once you learn the core usage, you only learn the options of the function you wish to execute.'
              }
            </p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <h3>{'Idempotence'}</h3>
            <p>
              {
                'Call a function multiple times and expect the same result. You’ll be informed of any modifications and can retrieve defailed information.'
              }
            </p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <h3>{'Flexibility'}</h3>
            <p>
              {
                'Deliberatly sacrifying speed for a maximum of strength, ease of use and flexibility. The simple API allows us to constantly add new functionnality without affecting the API.'
              }
            </p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <h3>{'Documentation'}</h3>
            <p>
              {
                'Learn fast. Source code is self-documented with the most commons usages enriched by many examples. Don’t forget to look at the tests as well.'
              }
            </p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <h3>{'SSH support'}</h3>
            <p>
              {
                'All the functions run transparently over SSH. Look at the tests, they are all executed both locally and remotely.'
              }
            </p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <h3>{'Reporting'}</h3>
            <p>
              {
                'Advanced reports can be optained by providing a log function, listening to stdout and stderr streams, generating diffs and backups.'
              }
            </p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <h3>{'Reliability'}</h3>
            <p>
              {
                'Feel confident. The modules are used in production for years and the code is enforced by an extensive test coverage.'
              }
            </p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <h3>{'Suppport'}</h3>
            <p>
              {
                'The package is open sourced with one of the least restrictive license. Involve yourself and contributes to open source development by sending push requests or requesting commercial support offered by Adaltas.'
              }
            </p>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(IndexPage)
