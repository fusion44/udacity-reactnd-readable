import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withStyles } from "material-ui/styles"
import TextField from "material-ui/TextField"
import Button from "material-ui/Button"
import Typography from "material-ui/Typography"
import { editComment, resetCommentEditor, submitComment } from "../actions"

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    backgroundColor: "#f5f5f5",
    padding: 10
  },
  titleRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  title: {
    marginRight: 15,
    marginLeft: 15
  }
})

class CommentEditor extends Component {
  constructor(props) {
    super(props)
    this.state = { author: "", body: "" }

    this.handleSubmitComment = this.handleSubmitComment.bind(this)
  }

  componentWillUnmount() {
    this.props.dispatch(resetCommentEditor())
  }

  handleChange = name => event => {
    const { isNew, commentId, postId, body, author } = this.props
    switch (name) {
      case "author":
        this.props.dispatch(
          editComment(isNew, postId, commentId, event.target.value, body)
        )
        return
      case "body":
        this.props.dispatch(
          editComment(isNew, postId, commentId, author, event.target.value)
        )
        return
      default:
        return
    }
  }

  handleSubmitComment() {
    const { isNew, commentId, postId, body, author } = this.props
    this.props.dispatch(submitComment(isNew, commentId, body, author, postId))
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <div className={classes.titleRow}>
          <Typography type="title" className={classes.title}>
            Leave a comment as
          </Typography>
          <TextField
            value={this.props.author}
            onChange={this.handleChange("author")}
          />
        </div>
        <TextField
          id="multiline-flexible"
          label="Remember to be polite."
          multiline
          value={this.props.body}
          onChange={this.handleChange("body")}
          margin="normal"
        />
        <Button onClick={this.handleSubmitComment}>Submit</Button>
      </div>
    )
  }
}

function mapStateToProps({ comments }, ownProps) {
  if (ownProps.comment) {
    return {
      isNew: false, // we've received a comment => not new
      commentId: ownProps.comment.id, // We must use the existing ID
      author: ownProps.comment.author,
      body: ownProps.comment.body
    }
  } else {
    return {
      isNew: true, // no comment object was received => new comment
      commentId: undefined, // new comment id will generated for the POST request
      author: comments.editedComment.author,
      body: comments.editedComment.body
    }
  }
}

CommentEditor.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object
}

let CommentEditorWithStyles = withStyles(styles)(CommentEditor)
export default connect(mapStateToProps)(CommentEditorWithStyles)
