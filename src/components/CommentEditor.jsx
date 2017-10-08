import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withStyles } from "material-ui/styles"
import classnames from "classnames"
import Comment from "./Comment"
import TextField from "material-ui/TextField"
import Button from "material-ui/Button"
import Typography from "material-ui/Typography"

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    backgroundColor: "#f5f5f5",
    padding: 10
  },
  titleRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  title: {
    marginRight: 15,
    marginLeft: 15
  }
})

class CommentEditor extends Component {
  constructor(props) {
    super(props)
    this.state = { author: "", body: "" }

    this.handleSubmitComment = this.handleSubmitComment.bind(this)
  }

  handleChange = name => event => {
    // TODO: move values to store
    this.setState({
      [name]: event.target.value
    })
  }

  handleSubmitComment() {}

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <div className={classes.titleRow}>
          <Typography type="title" className={classes.title}>
            Leave a comment as
          </Typography>
          <TextField
            value={this.props.author}
            onChange={this.handleChange("author")}
          />
        </div>
        <TextField
          id="multiline-flexible"
          label="Remember to be polite."
          multiline
          value={this.props.body}
          onChange={this.handleChange("body")}
          margin="normal"
        />
        <Button onClick={this.handleSubmitComment}>Submit</Button>
      </div>
    )
  }
}

function mapStateToProps({ comments }, ownProps) {
  if (ownProps.comment) {
    return {
      author: ownProps.comment.author,
      body: ownProps.comment.body
    }
  } else {
    return { author: "", body: "" }
  }
}

CommentEditor.propTypes = {
  comment: PropTypes.object
}

let CommentEditorWithStyles = withStyles(styles)(CommentEditor)
export default connect(mapStateToProps)(CommentEditorWithStyles)
