---
title: Contribute
description: Helps us by providing feedbacks, reporting issues, improving the documentation and submitting patches.
layout: template_action
sort: 4
community: yes
---

# Documentation

[Nikita website] is written is markdown and use the phenomic engine to convert its content to HTML.
[Nikita website] is written is markdown and use the phenomic engine to convert its content to HTML.
[Nikita website] is written is markdown and use the phenomic engine to convert its content to HTML.

```javascript
class TemplateWrapper extends React.Component {
  state = {
    menuOpen: false
  }
  onClickMenu = () => {
    console.log('onClickMenu')
    this.setState({'menuOpen': !this.state.menuOpen})
  }
  render() {
    const { children, classes } = this.props
    const menu = this.props.data.allMarkdownRemark.edges.map( edge => { return {path: edge.node.fields.slug, title: edge.node.frontmatter.title} } )
    return (
      <div className={classes.appFrame}>
        <Helmet
          title="Gatsby Default Starter"
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <HeaderStyled onClickMenu={this.onClickMenu} menuOpen={this.state.menuOpen} />
        <Drawer className={classes.drawer} open={this.state.menuOpen} menu={menu}/>
        <main
          className={classNames(classes.content, {[classes.contentShift]: this.state.menuOpen})}
        >
          {children()}
        </main>
      </div>
    )
  }

}
TemplateWrapper.propTypes = {
  children: PropTypes.func,
}
```

ko<br/>
ko<br/>
ko<br/>
ko<br/>
ko<br/>
ko<br/>
ko<br/>
ko<br/>
ko<br/>
ko<br/>
ko<br/>
ko<br/>
ko<br/>
ko<br/>
ko<br/>

ko<br/>
ko<br/>
ko<br/>
ko<br/>
ko<br/>
ko<br/>
ko<br/>
ko<br/>
ko<br/>
ko<br/>


[Nikita website]: https://github.com/adaltas/nikita
