import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withStyles } from "material-ui/styles"
import Button from "material-ui/Button"
import TextField from "material-ui/TextField"
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog"
import { addPostDialogChange } from "../actions"

const styles = theme => ({})

const PostAddDialog = props => {
  const { dispatch, category, author, title, body } = props
  return (
    <div>
      <Dialog open={props.open} onRequestClose={props.onSubmit}>
        <DialogTitle>Add a new post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Category"
            type="text"
            fullWidth
            onChange={event =>
              dispatch(
                addPostDialogChange(
                  true,
                  event.target.value,
                  author,
                  title,
                  body
                )
              )}
            value={category}
          />
          <TextField
            required
            margin="dense"
            id="name"
            label="Author"
            type="text"
            onChange={event =>
              dispatch(
                addPostDialogChange(
                  true,
                  category,
                  event.target.value,
                  title,
                  body
                )
              )}
            fullWidth
            value={author}
          />

          <TextField
            required
            margin="dense"
            id="name"
            label="Post Title"
            type="text"
            onChange={event =>
              dispatch(
                addPostDialogChange(
                  true,
                  category,
                  author,
                  event.target.value,
                  body
                )
              )}
            fullWidth
            value={title}
          />
          <TextField
            required
            multiline
            margin="dense"
            id="name"
            label="Post Text"
            type="text"
            onChange={event =>
              dispatch(
                addPostDialogChange(
                  true,
                  category,
                  author,
                  title,
                  event.target.value
                )
              )}
            fullWidth
            value={body}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={props.onSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

PostAddDialog.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

function mapStateToProps({ categories, local }) {
  const { dialogOpen, category, author, title, body } = local.addPostDialogState
  return {
    categories: categories.categories,
    open: dialogOpen,
    category,
    author,
    title,
    body
  }
}

let PostAddDialogWithStyles = withStyles(styles)(PostAddDialog)
export default connect(mapStateToProps)(PostAddDialogWithStyles)
