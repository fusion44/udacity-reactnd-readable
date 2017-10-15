import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "material-ui/styles"
import ThumbUp from "material-ui-icons/ThumbUp"
import ThumbDown from "material-ui-icons/ThumbDown"
import IconButton from "material-ui/IconButton"
import EditIcon from "material-ui-icons/Edit"
import DeleteIcon from "material-ui-icons/Delete"

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 5,
    marginRight: 5
  },
  scoreDisplay: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 4
  },
  thumb: {
    width: 20,
    height: 20
  },
  actionIcon: {
    paddingRight: 8,
    paddingBottom: 10,
    width: 25,
    height: 25
  }
})

const Voter = props => {
  const { classes } = props
  return (
    <div className={classes.container}>
      <IconButton
        className={classes.actionIcon}
        onClick={props.edit}
        aria-label="Edit"
      >
        <EditIcon />
      </IconButton>
      <IconButton
        className={classes.actionIcon}
        onClick={props.delete}
        aria-label="Delete"
      >
        <DeleteIcon />
      </IconButton>
      <IconButton
        onClick={props.upVote}
        className={props.classes.thumb}
        aria-label="Upvote"
      >
        <ThumbUp />
      </IconButton>
      <div className={classes.scoreDisplay}>Votes: {props.score}</div>
      <IconButton
        onClick={props.downVote}
        className={props.classes.thumb}
        aria-label="Downvote"
      >
        <ThumbDown />
      </IconButton>
    </div>
  )
}

Voter.propTypes = {
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(Voter)
