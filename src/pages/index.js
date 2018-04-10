import React from 'react'
import Link from 'gatsby-link'

const IndexPage = () => (
  <div>
    <h1>Hi people</h1>
    <p>Welcome to your this site.</p>
    <p>Now go build something great.</p>
    <ul>
      <li>
        <Link to="/page-2/">Go to page 2</Link>
      </li>
      <li>
        <Link to="/about/contribute">Contribute</Link>
      </li>
      <li>
        <Link to="/about/guidelines">Guidelines</Link>
      </li>
      <li>
        <Link to="/templates/action">Template Action</Link>
      </li>
    </ul>
  </div>
)

export default IndexPage
