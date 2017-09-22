import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "material-ui/styles"
import Paper from "material-ui/Paper"
import Typography from "material-ui/Typography"
import Divider from "material-ui/Divider"
import Grid from "material-ui/Grid"
import IconButton from "material-ui/IconButton"
import ThumbUp from "material-ui-icons/ThumbUp"
import ThumbDown from "material-ui-icons/ThumbDown"
import Moment from "moment"

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
  thumb: {
    paddingLeft: 4,
    paddingBottom: 10,
    width: 20,
    height: 20
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
          <div className={classes.headerText}>Votes: {comment.voteScore}</div>
          <IconButton className={classes.thumb} aria-label="Upvote">
            <ThumbUp />
          </IconButton>
          <IconButton className={classes.thumb} aria-label="Downvote">
            <ThumbDown />
          </IconButton>
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
  comment: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Comment)
