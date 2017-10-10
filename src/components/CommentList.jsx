import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withStyles } from "material-ui/styles"
import classnames from "classnames"
import Comment from "./Comment"
import CommentEditor from "./CommentEditor"

const styles = theme => ({})

class CommentList extends Component {
  renderComments() {
    if (!this.props.comments) {
      return <h1>Loading ...</h1>
    } else {
      let commentItems = []
      commentItems.push(
        this.props.comments.map((comment, index) => (
          <Comment
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
    const { classes } = this.props

    return (
      <div>
        {this.renderComments()}
        <CommentEditor postId={this.props.postId} />
      </div>
    )
  }
}

function mapStateToProps({ comments }, ownProps) {
  return {
    postId: ownProps.postId,
    comments: comments.comments[ownProps.postId]
  }
}

CommentList.propTypes = {
  postId: PropTypes.string.isRequired
}

let CommentListWithStyles = withStyles(styles)(CommentList)
export default connect(mapStateToProps)(CommentListWithStyles)
