import { RECEIVE_POSTS, ADD_POST } from "../actions"

function posts(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return state
    case ADD_POST:
      //const { post } = action
      return state
    default:
      return state
  }
}

export default posts
