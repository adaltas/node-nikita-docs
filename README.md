# Nikita Website

The official Nikita website based on Gatsby and Material-UI.

To install and run the server:

```
git clone https://github.com/adaltas/node-nikita-docs.git nikita-docs
cd nikita-docs
npm install
./node_modules/.bin/gatsby develop
```

## TODO

* Improve inline code, currently padding is different between left and right
* Menu generation must be generic like in GitBook, using README.md for section
* Create homepage from the template
* Apply footer already design in the template
* Automatic conversion between CoffeeScript and JavaScript source code

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
