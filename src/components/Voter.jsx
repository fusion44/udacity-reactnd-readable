import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "material-ui/styles"
import ThumbUp from "material-ui-icons/ThumbUp"
import ThumbDown from "material-ui-icons/ThumbDown"
import IconButton from "material-ui/IconButton"

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
  }
})

const Voter = props => {
  return (
    <div className={props.classes.container}>
      <IconButton
        onClick={props.upVote}
        className={props.classes.thumb}
        aria-label="Upvote"
      >
        <ThumbUp />
      </IconButton>
      <div className={props.classes.scoreDisplay}>Votes: {props.score}</div>
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
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(Voter)
