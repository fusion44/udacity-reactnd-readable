import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withStyles } from "material-ui/styles"
import Comment from "./Comment"
import CommentEditor from "./CommentEditor"
import Button from "material-ui/Button"
import TextField from "material-ui/TextField"
import Dialog, { DialogActions, DialogTitle } from "material-ui/Dialog"
import { editCommentPopUp, submitComment, deleteComment } from "../actions"

const styles = theme => ({
  content: {
    padding: 5
  }
})

class CommentList extends Component {
  handleRequestClose = () => {
    this.props.dispatch(editCommentPopUp(false, "", ""))
  }

  editComment(comment) {
    this.props.dispatch(editCommentPopUp(true, comment.id, comment.body))
  }

  handleDeleteComment(comment) {
    this.props.dispatch(deleteComment(comment))
  }

  handleRequestSubmit() {
    this.props.dispatch(
      submitComment(
        false,
        this.props.editedCommentData.id,
        this.props.editedCommentData.body
      )
    )
    this.handleRequestClose()
  }

  handleChange(event) {
    this.props.dispatch(
      editCommentPopUp(
        true,
        this.props.editedCommentData.id,
        event.target.value
      )
    )
  }

  renderDialog() {
    const { classes } = this.props

    return (
      <Dialog
        open={this.props.editedCommentData.popupOpen}
        onRequestClose={this.handleRequestClose}
      >
        <DialogTitle>Edit Comment</DialogTitle>
        <div className={classes.content}>
          <TextField
            id="multiline-flexible"
            label="Remember to be polite."
            multiline
            value={this.props.editedCommentData.body}
            onChange={this.handleChange.bind(this)}
            margin="normal"
          />
        </div>
        <DialogActions>
          <Button onClick={this.handleRequestClose} color="accent">
            Delete
          </Button>
          <Button onClick={this.handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleRequestSubmit.bind(this)} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  renderComments() {
    if (!this.props.comments) {
      return <h1>Loading ...</h1>
    } else {
      let commentItems = []
      commentItems.push(
        this.props.comments.map((comment, index) => (
          <Comment
            onEditComment={this.editComment.bind(this)}
            onDeleteComment={this.handleDeleteComment.bind(this)}
            postId={this.props.postId}
            comment={comment}
            key={index + 1}
          />
        ))
      )

      return commentItems
    }
  }

  render() {
    return (
      <div>
        {this.renderComments()}
        <CommentEditor postId={this.props.postId} />
        {this.renderDialog()}
      </div>
    )
  }
}

function mapStateToProps({ comments, local }, ownProps) {
  return {
    postId: ownProps.postId,
    comments: comments.comments[ownProps.postId],
    editedCommentData: local.editCommentPopup
  }
}

CommentList.propTypes = {
  postId: PropTypes.string.isRequired
}

let CommentListWithStyles = withStyles(styles)(CommentList)
export default connect(mapStateToProps)(CommentListWithStyles)
