# gatsby-starter-default

The default Gatsby starter

For an overview of the project structure please refer to the [Gatsby documentation - Building with Components](https://www.gatsbyjs.org/docs/building-with-components/)

Install this starter (assuming Gatsby is installed) by running from your CLI:
```
gatsby new gatsby-example-site
```

## Request

From [GraphQL UI](http://localhost:8000/___graphql)

Query to display a page :

```
query BlogPostByPath($path: String!) {
  markdownRemark(frontmatter: { path: { eq: $path } }) {
    html
    frontmatter {
      date(formatString: "MMMM DD, YYYY")
      path
      title
    }
  }
}
# Query variable
{"path": "/blog/my-first-post"}
```

```
query BlogPostByPath($slug: String!) {
  markdownRemark(fields: { slug: { eq: $slug } } ) {
    html
    frontmatter {
      date(formatString: "MMMM DD, YYYY")
      path
      title
    }
  }
}
# Query variable
{"slug": "/about/contribute/"}
```
