import React, { Component } from "react"
import { connect } from "react-redux"
import { withStyles } from "material-ui/styles"
import Card, { CardActions, CardContent } from "material-ui/Card"
import Button from "material-ui/Button"
import Typography from "material-ui/Typography"
import { fetchComments } from "../actions"
import IconButton from "material-ui/IconButton"
import ExpandMoreIcon from "material-ui-icons/ExpandMore"
import Collapse from "material-ui/transitions/Collapse"
import classnames from "classnames"
import Comment from "./Comment"

const styles = theme => ({
  card: {
    margin: "auto",
    maxWidth: 750,
    marginBottom: 5
  },
  title: {
    marginBottom: 16,
    fontSize: 22,
    color: theme.palette.text.secondary
  },
  author: {
    marginBottom: 20,
    fontSize: 14
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  flexGrow: {
    flex: "1 1 auto"
  }
})

class PostItem extends Component {
  state = { expanded: false }

  componentDidMount() {
    this.props.dispatch(fetchComments(this.props.post.id))
  }

  handleExpandClick() {
    this.setState({ expanded: !this.state.expanded })
  }

  renderComments() {
    if (!this.props.comments) {
      return <h1>Loading ...</h1>
    } else {
      let commentItems = []
      commentItems.push(
        this.props.comments.map((comment, index) => (
          <Comment comment={comment} key={index + 1} />
        ))
      )

      return commentItems
    }
  }

  render() {
    const { classes, post } = this.props

    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography type="body1" className={classes.title}>
              {this.props.post.title}
            </Typography>
            <div className={classes.author}>
              by <i>{post.author}</i>
            </div>
            <Typography component="p">{post.body}</Typography>
          </CardContent>
          <CardActions>
            <Button dense>Learn More</Button>
            <div className={classes.flexGrow} />
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded
              })}
              onClick={this.handleExpandClick.bind(this)}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse
            in={this.state.expanded}
            transitionDuration="auto"
            unmountOnExit
          >
            <CardContent>{this.renderComments()}</CardContent>
          </Collapse>
        </Card>
      </div>
    )
  }
}

function mapStateToProps({ comments }, ownProps) {
  let numComments = 0
  if (comments.comments[ownProps.post.id] !== undefined) {
    numComments = comments.comments[ownProps.post.id].length
  }

  return {
    comments: comments.comments[ownProps.post.id],
    numComments
  }
}

let PI = withStyles(styles)(PostItem)
export default connect(mapStateToProps)(PI)
