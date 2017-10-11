import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withStyles } from "material-ui/styles"
import Paper from "material-ui/Paper"
import Typography from "material-ui/Typography"
import Divider from "material-ui/Divider"
import Grid from "material-ui/Grid"
import IconButton from "material-ui/IconButton"
import EditIcon from "material-ui-icons/Edit"
import Voter from "./Voter"
import Moment from "moment"
import { voteComment } from "../actions"

const styles = theme => ({
  container: {
    flexGrow: 1,
    paddingBottom: 6
  },
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  }),
  flexGrow: {
    flex: "1 1 auto"
  },
  editIcon: {
    paddingRight: 8,
    paddingBottom: 10,
    width: 25,
    height: 25
  },
  headerText: {
    padding: "4px 0"
  }
})

const Comment = props => {
  const { classes, comment } = props
  return (
    <div>
      <Paper className={classes.root} elevation={0}>
        <Grid container className={classes.container}>
          <div className={classes.headerText}>
            by {comment.author},{" "}
            {Moment.unix(comment.timestamp / 1000).format("LL")}
          </div>
          <div className={classes.flexGrow} />
          <IconButton
            className={classes.editIcon}
            onClick={() => {
              props.onEditComment(comment)
            }}
            aria-label="Edit"
          >
            <EditIcon />
          </IconButton>
          <Voter
            upVote={() => props.onVoteClick(comment, "upVote")}
            downVote={() => props.onVoteClick(comment, "downVote")}
            score={comment.voteScore}
          />
        </Grid>
        <Divider light />
        <Typography type="body1" component="p">
          {comment.body}
        </Typography>
      </Paper>
    </div>
  )
}

Comment.propTypes = {
  onVoteClick: PropTypes.func.isRequired,
  onEditComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    onVoteClick: (comment, vote) => {
      dispatch(voteComment(comment, vote))
    }
  }
}

let CommentWithStyles = withStyles(styles)(Comment)
export default connect(null, mapDispatchToProps)(CommentWithStyles)
