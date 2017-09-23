import { RECEIVE_POSTS, ADD_POST } from "../actions"

function posts(state = { posts: [] }, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      const { posts } = action
      return {
        ...state,
        posts
      }
    case ADD_POST:
      //const { post } = action
      return state
    default:
      return state
  }
}

export default posts
