import React from 'react'
import Layout from '../../components/doc'
import { graphql } from 'gatsby'

import Typography from '@material-ui/core/Typography'

const IndexPage = (data) => (
  <Layout>
    <div>
      <Typography variant="display4">display4</Typography>
      <br />
      <Typography variant="display3">display3</Typography>
      <br />
      <Typography variant="display2">display2</Typography>
      <br />
      <Typography variant="display1">display1</Typography>
      <br />
      <Typography variant="headline">headline</Typography>
      <br />
      <Typography variant="title">title</Typography>
      <br />
      <Typography variant="subheading">subheading</Typography>
      <br />
      <Typography variant="body2">body2</Typography>
      <br />
      <Typography variant="body1">body1 (default)</Typography>
      <br />
      <Typography variant="caption">caption</Typography>
      <br />
      <Typography variant="button">button</Typography>
      <br />
    </div>
  </Layout>
)

export default IndexPage
