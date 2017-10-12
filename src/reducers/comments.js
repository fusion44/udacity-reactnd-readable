import {
  RECEIVE_COMMENT,
  RECEIVE_COMMENTS,
  EDIT_COMMENT,
  RESET_COMMENT_EDITOR
} from "../actions"

function sort(comments) {
  return comments.sort((a, b) => {
    return b.voteScore - a.voteScore
  })
}

function comments(
  state = { comments: {}, editedComment: { postId: "", author: "", body: "" } },
  action
) {
  switch (action.type) {
    case RECEIVE_COMMENT:
      const { parentId } = action.comment
      let newComments = []
      if (state.comments[parentId]) {
        newComments = state.comments[parentId].filter(c => {
          return c.id === action.comment.id ? undefined : c
        })
      }

      newComments.push(action.comment)

      let newMap = { ...state.comments }
      newMap[parentId] = sort(newComments)

      return {
        ...state,
        comments: newMap
      }
    case RECEIVE_COMMENTS:
      let map = { ...state.comments }
      map[action.postId] = sort(action.comments)
      return {
        ...state,
        comments: map
      }
    case EDIT_COMMENT:
      return {
        ...state,
        editedComment: action.editedComment
      }
    case RESET_COMMENT_EDITOR:
      return {
        ...state,
        editedComment: { postId: "", author: "", body: "" }
      }
    default:
      return state
  }
}

export default comments
