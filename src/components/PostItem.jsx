import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import { Link } from "react-router-dom"
import { withStyles } from "material-ui/styles"
import Card, { CardActions, CardContent } from "material-ui/Card"
import Button from "material-ui/Button"
import TextField from "material-ui/TextField"
import Typography from "material-ui/Typography"
import {
  fetchComments,
  toggleExpandPost,
  votePost,
  setEditedPostContent,
  setEditPost,
  deletePost
} from "../actions"
import IconButton from "material-ui/IconButton"
import ExpandMoreIcon from "material-ui-icons/ExpandMore"
import Collapse from "material-ui/transitions/Collapse"
import classnames from "classnames"
import CommentList from "./CommentList"
import Voter from "./Voter"
import Moment from "moment"

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
  constructor(props) {
    super(props)

    this.handleExpandClick = this.handleExpandClick.bind(this)
    this.handleUpVote = this.handleUpVote.bind(this)
    this.handleDownVote = this.handleDownVote.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(fetchComments(this.props.post.id))
    if (
      this.props.isDetail !== undefined &&
      this.props.isDetail === true &&
      !this.props.expanded
    ) {
      this.props.dispatch(toggleExpandPost(this.props.post.id))
    }
  }

  handleExpandClick() {
    this.props.dispatch(toggleExpandPost(this.props.post.id))
  }

  handleUpVote() {
    this.props.dispatch(votePost(this.props.post, "upVote"))
  }

  handleDownVote() {
    this.props.dispatch(votePost(this.props.post, "downVote"))
  }

  handleDelete() {
    this.props.dispatch(deletePost(this.props.post))
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
    const { category, id } = this.props.post
    this.props.history.push(`/${category}/${id}`)
  }

  render() {
    const {
      classes,
      post,
      numComments,
      isDetail,
      edit,
      edited_post
    } = this.props

    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            {!edit ? (
              <Typography type="body1" className={classes.title}>
                {post.title}
              </Typography>
            ) : (
              <TextField
                onChange={this.props.onHandleTitleChange}
                id="name"
                value={edited_post.title}
                margin="normal"
              />
            )}
            <div className={classes.author}>
              <i>{post.author}</i>,{" "}
              {Moment.unix(post.timestamp / 1000).format("LL")}
            </div>
            {!edit ? (
              <Typography component="p">{post.body}</Typography>
            ) : (
              <TextField
                multiline
                rowsMax="4"
                id="name"
                value={edited_post.body}
                onChange={this.props.onHandleBodyChange}
                margin="normal"
              />
            )}
          </CardContent>
          <CardActions>
            {isDetail ? (
              undefined
            ) : (
              <Button dense>
                <Link to={"/" + post.category + "/" + post.id}>Details</Link>
              </Button>
            )}
            <div className={classes.flexGrow} />
            <Voter
              upVote={this.handleUpVote}
              downVote={this.handleDownVote}
              delete={this.handleDelete}
              edit={this.handleEdit}
              score={post.voteScore}
            />
            <div>Comments: {numComments}</div>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.props.expanded
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.props.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse
            in={this.props.expanded}
            transitionDuration="auto"
            unmountOnExit
          >
            <CardContent>
              <CommentList postId={this.props.postId} />
            </CardContent>
          </Collapse>
        </Card>
      </div>
    )
  }
}

function mapStateToProps({ posts, comments, local }, ownProps) {
  const { postId } = ownProps

  let numComments = 0
  if (comments.comments[postId] !== undefined) {
    numComments = comments.comments[postId].length
  }

  return {
    post: posts.postMap[postId],
    comments: comments.comments[postId],
    expanded: postId === posts.expandedId,
    numComments,
    edit: local.edit_post
  }
}

PostItem.propTypes = {
  isDetail: PropTypes.bool,
  postId: PropTypes.string.isRequired,
  edited_post: PropTypes.object,
  classes: PropTypes.object.isRequired,
  onHandleTitleChange: PropTypes.func,
  onHandleBodyChange: PropTypes.func
}

let PI = withStyles(styles)(PostItem)
PI = withRouter(PI)
export default connect(mapStateToProps)(PI)
