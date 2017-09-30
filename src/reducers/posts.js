import { RECEIVE_POST, RECEIVE_POSTS, ADD_POST } from "../actions"

function posts(state = { posts: [], postMap: {} }, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      const { posts } = action
      let postMap = posts.reduce((map, post) => {
        map[post.id] = post
        return map
      }, {})
      return {
        ...state,
        posts,
        postMap
      }
    case RECEIVE_POST:
      const { post } = action
      let newPostList = state.posts.filter(p_existing => {
        // replace old post data with the newly received data
        return p_existing.id === post.id ? post : p_existing
      })
      let newPostMap = { ...state.postMap }
      newPostMap[post.id] = post
      return {
        ...state,
        posts: newPostList,
        postMap: newPostMap
      }
    case ADD_POST:
      //const { post } = action
      return state
    default:
      return state
  }
}

export default posts
