import { ADD_COMMENT, RECEIVE_COMMENT, RECEIVE_COMMENTS } from "../actions"

function sort(comments) {
  return comments.sort((a, b) => {
    return b.voteScore - a.voteScore
  })
}

function comments(state = { comments: {} }, action) {
  switch (action.type) {
    case RECEIVE_COMMENT:
      const { parentId } = action.comment
      let newComments = state.comments[parentId].filter(c => {
        return c.id === action.comment.id ? undefined : c
      })

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
    case ADD_COMMENT:
      return state
    default:
      return state
  }
}

export default comments
