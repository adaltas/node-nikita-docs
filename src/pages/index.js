import React from 'react'
import Layout from '../components/index'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { graphql } from 'gatsby'
// Syntax
import SyntaxHighlighter, {registerLanguage} from 'react-syntax-highlighter/prism-light'
import javascript from 'react-syntax-highlighter/languages/prism/javascript'
import { tomorrow } from 'react-syntax-highlighter/styles/prism'
registerLanguage('javascript', javascript);

const styles = theme => ({
  root: {
    flexGrow: 1,
    '& h2': {
      textAlign: 'center',
    }
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
    const { classes } = this.props
    const codeString = `
    // User configuration
    const options = {
      // url: 'http://download.redis.io/redis-stable.tar.gz',
      // config: {
      //   bind: '127.0.0.1',
      //   port: 6379,
      //   ...
      // }
    }
    // Nikita instantiation
    require('nikita')
    // Activate CLI reporting
    .log.cli()
    // Execute the Redis action
    .call(options, header: 'Redis', function(options){
      // Default options
      if(!options.url){ options.url = 'http://download.redis.io/redis-stable.tar.gz' }
      if(!options.config){ options.config = {} }
      if(!options.config['bind']){ options.config['bind'] = '127.0.0.1' }
      if(!options.config['protected-mode']){ options.config['protected-mode'] = 'yes' }
      if(!options.config['port']){ options.config['port'] = 6379 }
      // Do the job
      this
      .file.download({
        header: 'Download',
        source: options.url,
        target: 'cache/redis-stable.tar.gz'
      })
      .system.execute({
        header: 'Compilation',
        unless_exists: 'redis-stable/src/redis-server',
        cmd: \`
        tar xzf cache/redis-stable.tar.gz
        cd redis-stable
        make
        \`
      })
      .file.properties({
        header: 'Configuration',
        target: 'conf/redis.conf',
        separator: ' ',
        content: options.config
      })
      .system.execute({
        header: 'Startup',
        code_skipped: 3,
        cmd: \`
        ./src/redis-cli ping && exit 3
        nohup ./redis-stable/src/redis-server conf/redis.conf &
        \`
      })
    })
    `
    return (
      <Layout>
        <div className={classes.root}>
          <h2>Main library features</h2>
          <Grid container spacing={24}>
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
        <div className={classes.root}>
          <h2>Example installation of Redis</h2>
          <SyntaxHighlighter language='javascript' style={tomorrow}>{codeString}</SyntaxHighlighter>
        </div>
      </Layout>
    )
  }
}

export default withStyles(styles)(IndexPage)
