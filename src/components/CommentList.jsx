import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withStyles } from "material-ui/styles"
import classnames from "classnames"
import Comment from "./Comment"

const styles = theme => ({})

class CommentList extends Component {
  constructor(props) {
    super(props)
    this.state = { expanded: false }

    this.handleAddComment = this.handleAddComment.bind(this)
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

  handleAddComment() {
    console.log("Add")
  }

  render() {
    const { classes } = this.props

    return <div>{this.renderComments()}</div>
  }
}

function mapStateToProps({ comments }, ownProps) {
  return {
    comments: comments.comments[ownProps.postId]
  }
}

CommentList.propTypes = {
  postId: PropTypes.string.isRequired
}

let CommentListWithStyles = withStyles(styles)(CommentList)
export default connect(mapStateToProps)(CommentListWithStyles)
