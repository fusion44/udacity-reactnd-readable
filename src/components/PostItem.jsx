import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { withStyles } from "material-ui/styles"
import Card, { CardActions, CardContent } from "material-ui/Card"
import Button from "material-ui/Button"
import TextField from "material-ui/TextField"
import Typography from "material-ui/Typography"
import { fetchComments } from "../actions"
import IconButton from "material-ui/IconButton"
import ExpandMoreIcon from "material-ui-icons/ExpandMore"
import Collapse from "material-ui/transitions/Collapse"
import classnames from "classnames"
import Comment from "./Comment"
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
  state = { expanded: false }

  componentDidMount() {
    this.props.dispatch(fetchComments(this.props.post.id))
    if (this.props.isDetail !== undefined && this.props.isDetail === true) {
      this.setState({ expanded: true })
    }
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

  handleUpVote() {
    console.log("up")
  }

  handleDownVote() {
    console.log("down")
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
              score={post.voteScore}
            />
            <div>Comments: {numComments}</div>
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

function mapStateToProps({ comments, local }, ownProps) {
  let numComments = 0
  if (comments.comments[ownProps.post.id] !== undefined) {
    numComments = comments.comments[ownProps.post.id].length
  }

  return {
    comments: comments.comments[ownProps.post.id],
    numComments,
    edit: local.edit_post
  }
}

PostItem.propTypes = {
  isDetail: PropTypes.bool,
  post: PropTypes.object.isRequired,
  edited_post: PropTypes.object,
  classes: PropTypes.object.isRequired,
  onHandleTitleChange: PropTypes.func,
  onHandleBodyChange: PropTypes.func
}

let PI = withStyles(styles)(PostItem)
export default connect(mapStateToProps)(PI)
