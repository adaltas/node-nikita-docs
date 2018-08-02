// React
import React, {Component} from 'react'
import ReactDom from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
// Material UI
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import EditIcon from '@material-ui/icons/EditOutlined'
import ListIcon from '@material-ui/icons/ListOutlined'
import { withStyles } from '@material-ui/core/styles'

require('prismjs/themes/prism-tomorrow.css')

const styles = theme => ({
  content: theme.mixins.gutters({
    ...theme.typography,
    paddingTop: 40,
    flex: '1 1 100%',
    maxWidth: '100%',
    margin: '0 auto 3rem',
    '& a': {
      textDecoration: 'none',
      '&:link,&:visited': {
        color: '#00618E',
      },
      '&:hover': {
        textDecoration: 'none',
        color: theme.link.normal,
      },
    },
    '& h1': {
      color: '#777777',
      fontWeight: 'normal',
    },
    '& h2': {
      color: '#777777',
      fontWeight: 'normal',
    },
    '& h3': {
      color: '#777777',
      fontWeight: 'normal',
    },
    '& em': {
      color: '#2D2D2D',
    },
    '& blockquote': {
      borderLeft: '3px solid #777777',
      margin: 0,
      paddingLeft: '40px',
    },
    '& blockquote p': {
      color: '#777777',
    },
    '& blockquote p > code[class*="language-"]': {
      color: '#646464',
    },
    '& p': {
      color: '#2D2D2D',
      textAlign: 'justify',
    },
    '& ul p': {
      margin: 0,
    },
    '& ul': {
      paddingLeft: 20,
      // listStylePosition: 'inside',
    },
    '& li': {
      color: '#2D2D2D',
      textAlign: 'justify',
    },
    '& :not(pre) > code[class*="language-"]': {
      padding: '.2em .3em 0 .3em',
      background: '#E6E6E6',
      color: '#000',
    },
    '& .toc': {
      borderTop: '1px solid #E5E7EA',
      borderBottom: '1px solid #E5E7EA',
      padding: '5px 0',
      display: 'none',
      // background: '#E5E7EA',
      // borderRadius: 5,
      // padding: '20px 20px',
      '& h2': {
        marginTop: 0,
        // marginBottom: 0,
      },
      '& ul': {
        marginTop: 0,
        marginBottom: 0,
      }
    }
  }),
  [theme.breakpoints.up(900 + theme.spacing.unit * 6)]: {
    content: {
      maxWidth: 900,
    },
  },
  icons: {
    float: 'right',
    color: '#cccccc',
    '&:link,&:visited': {
      color: '#cccccc !important',
    },
    '&:hover': {
      textDecoration: 'none',
      color: theme.link.normal+' !important',
    },
  },
})

class Content extends Component {
  // componentDidMount(){
  //   console.log('!!!!!!!!!!!content.componentDidMount!!!!!!!!!!!!!!!')
  //   if(!this.props.page) return;
  //   const contentNode = ReactDom.findDOMNode(this.refs.content)
  //   const tocNode = contentNode.querySelector('.toc')
  //   if( !tocNode ) return
  //   const display = window.getComputedStyle(tocNode).display
  //   tocNode.style.display = display === 'none' ? '' : 'none'
  // }
  render (){
    const {classes, children, theme, page} = this.props
    const toggleToc = () => {
      if(!this.props.page) return;
      const contentNode = ReactDom.findDOMNode(this.refs.content)
      const tocNode = contentNode.querySelector('.toc')
      if( !tocNode ) return
      const display = window.getComputedStyle(tocNode).display
      tocNode.style.display = display === 'none' ? 'block' : 'none'
    }
    return (
      <main ref="content" className={classNames(classes.content)}>
        { page &&
          <Tooltip
            id="content-edit"
            title="Edit on GitHub"
            enterDelay={300}
          >
            <IconButton
              color="inherit"
              href={page.fields.edit_url}
              target="_blank"
              rel="noopener"
              aria-labelledby="content-edit"
              className={classes.icons}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        }
        { page && 
          <Tooltip
            id="content-toc"
            title="Toggle table of content"
            enterDelay={300}
          >
            <IconButton
              color="inherit"
              aria-labelledby="content-toc"
              className={classes.icons}
              onClick={toggleToc}
            >
              <ListIcon />
            </IconButton>
          </Tooltip>
        }
        {children}
      </main>
    )
  }
}

Content.propTypes = {
  children: PropTypes.node.isRequired,
}

export default withStyles(styles, { withTheme: true })(Content)
