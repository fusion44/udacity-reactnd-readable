import { SET_SORT, RECEIVE_POST, RECEIVE_POSTS, ADD_POST } from "../actions"

function sort(posts, sort) {
  return posts.sort((a, b) => {
    if (sort === "date") {
      return b.timestamp - a.timestamp
    } else {
      // at the moment, there are only two choices, so just assume "votes"
      return b.voteScore - a.voteScore
    }
  })
}

function postsMap(posts) {
  return posts.reduce((map, post) => {
    map[post.id] = post
    return map
  }, {})
}

function postsByCategory(posts) {
  return posts.reduce((map, post) => {
    if (!map[post.category]) {
      map[post.category] = []
    }
    map[post.category].push(post)
    return map
  }, {})
}

function posts(
  state = { sort: "date", posts: [], postMap: {}, postsByCategory: {} },
  action
) {
  switch (action.type) {
    case SET_SORT:
      let sortedPosts = sort(state.posts, action.sort)
      return {
        ...state,
        sort: action.sort,
        posts: sortedPosts,
        postMap: postsMap(sortedPosts),
        postsByCategory: postsByCategory(sortedPosts)
      }
    case RECEIVE_POSTS:
      const { posts } = action
      let sorted = sort(posts, state.sort)
      return {
        ...state,
        posts: sorted,
        postMap: postsMap(sorted),
        postsByCategory: postsByCategory(sorted)
      }
    case RECEIVE_POST:
      const { post } = action

      // replace old post data with the newly received data
      let newPostList = state.posts.filter(p_existing => {
        // sort out old post, if it exists
        return p_existing.id === post.id ? undefined : p_existing
      })

      // Add the new post. Might be a new post or an updated one
      newPostList.push(post)
      newPostList = sort(newPostList, state.sort)
      return {
        ...state,
        posts: newPostList,
        postMap: postsMap(newPostList),
        postsByCategory: postsByCategory(newPostList)
      }
    case ADD_POST:
      //const { post } = action
      return state
    default:
      return state
  }
}

export default posts
