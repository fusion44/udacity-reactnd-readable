import React, { Component } from "react"
import { connect } from "react-redux"
import {
  fetchComments,
  fetchPost,
  setEditPost,
  setEditedPostContent,
  putEditPost,
  deletePost
} from "../actions"
import AppBar from "material-ui/AppBar"
import { withStyles } from "material-ui/styles"
import PostItem from "./PostItem"
import NotFoundError from "./NotFoundError"
import Grid from "material-ui/Grid"
import IconButton from "material-ui/IconButton"
import ArrowBackIcon from "material-ui-icons/ArrowBack"
import EditIcon from "material-ui-icons/Edit"
import DoneIcon from "material-ui-icons/Done"
import DeleteIcon from "material-ui-icons/Delete"

const styles = theme => ({
  appBar: {
    flexGrow: 1,
    height: 48,
    marginBottom: 20
  },
  flexGrow: {
    flex: "1 1 auto"
  },
  group: {
    flexDirection: "row"
  },
  icon: {
    paddingTop: 14,
    paddingLeft: 6,
    paddingRight: 10
  }
})

class PostDetail extends Component {
  constructor(props) {
    super(props)

    this.handleBack = this.handleBack.bind(this)
    this.handleDone = this.handleDone.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleBodyChange = this.handleBodyChange.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(fetchPost(this.props.match.params.post_id))
    this.props.dispatch(fetchComments(this.props.match.params.post_id))
  }

  handleTitleChange(arg) {
    this.props.dispatch(setEditedPostContent({ title: arg.target.value }))
  }

  handleBodyChange(arg) {
    this.props.dispatch(setEditedPostContent({ body: arg.target.value }))
  }

  handleBack() {
    this.props.dispatch(setEditPost(false))
    this.props.history.goBack()
  }

  handleEdit() {
    this.props.dispatch(setEditPost(true))
    this.props.dispatch(
      setEditedPostContent({
        id: this.props.post.id,
        title: this.props.post.title,
        body: this.props.post.body
      })
    )
  }

  handleDone() {
    this.props.dispatch(putEditPost())
    this.props.dispatch(setEditPost(false))
  }

  handleDelete() {
    this.props.dispatch(deletePost(this.props.post)).then(() => {
      this.props.history.push("/")
    })
  }

  getContent() {
    const { loading, post, edited_post } = this.props
    return loading ? (
      <div>Loading...</div>
    ) : post.found ? (
      <PostItem
        isDetail={true}
        postId={post.id}
        edited_post={edited_post}
        onHandleTitleChange={this.handleTitleChange}
        onHandleBodyChange={this.handleBodyChange}
      />
    ) : (
      <NotFoundError text="Post not found" />
    )
  }

  render() {
    const { classes, edit_post, post } = this.props
    let buttonsEnabled = !post || !post.found

    return (
      <div>
        <AppBar className={classes.appBar} position="static">
          <Grid container className={classes.container}>
            <IconButton
              className={classes.icon}
              onClick={this.handleBack}
              aria-label="Back"
            >
              <ArrowBackIcon />
            </IconButton>
            <div className={classes.flexGrow} />
            {edit_post ? (
              <IconButton
                className={classes.icon}
                onClick={this.handleDone}
                aria-label="Done"
                disabled={buttonsEnabled}
              >
                <DoneIcon />
              </IconButton>
            ) : (
              <IconButton
                className={classes.icon}
                onClick={this.handleEdit}
                aria-label="Edit"
                disabled={buttonsEnabled}
              >
                <EditIcon />
              </IconButton>
            )}
            <IconButton
              className={classes.icon}
              onClick={this.handleDelete}
              aria-label="Edit"
              disabled={buttonsEnabled}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </AppBar>
        {this.getContent()}
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
  return {
    loading,
    post: posts.postMap[post_id],
    edit_post: local.edit_post,
    edited_post: local.edited_post
  }
}

let PostDetailWithStyles = withStyles(styles)(PostDetail)
export default connect(mapStateToProps)(PostDetailWithStyles)
