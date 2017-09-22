import { ADD_COMMENT, RECEIVE_COMMENTS } from "../actions"

function comments(state = { comments: {} }, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      let map = { ...state.comments }
      map[action.postId] = action.comments
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
