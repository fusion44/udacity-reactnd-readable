import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchComments, fetchPost } from "../actions"
import AppBar from "material-ui/AppBar"
import { withStyles } from "material-ui/styles"
import PostItem from "./PostItem"
import IconButton from "material-ui/IconButton"
import ArrowBackIcon from "material-ui-icons/ArrowBack"

const styles = theme => ({
  appBar: {
    height: 48,
    marginBottom: 20
  },
  group: {
    flexDirection: "row"
  }
})

class PostDetail extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPost(this.props.match.params.post_id))
    this.props.dispatch(fetchComments(this.props.match.params.post_id))
  }

  handleBack() {
    this.props.history.goBack()
  }

  render() {
    const { loading, classes, post } = this.props
    return (
      <div>
        <AppBar className={classes.appBar} position="static">
          <IconButton onClick={this.handleBack.bind(this)} aria-label="Back">
            <ArrowBackIcon />
          </IconButton>
        </AppBar>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <PostItem isDetail={true} post={post} />
        )}
      </div>
    )
  }
}

function mapStateToProps({ comments, posts, local }, ownProps) {
  const { post_id } = ownProps.match.params
  let loading = true
  if (
    posts.postMap[post_id] !== undefined &&
    comments.comments[post_id] !== undefined
  ) {
    loading = false
  }
  return { loading, post: posts.postMap[post_id], local }
}

let PostDetailWithStyles = withStyles(styles)(PostDetail)
export default connect(mapStateToProps)(PostDetailWithStyles)
