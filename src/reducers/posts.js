import {
  DELETE_POST,
  EXPAND_POST,
  SET_SORT,
  RECEIVE_POST,
  RECEIVE_POSTS
} from "../actions"

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
  state = {
    sort: "date",
    posts: [],
    postMap: {},
    postsByCategory: {},
    expandedId: ""
  },
  action
) {
  switch (action.type) {
    case EXPAND_POST:
      // If the post is already expanded close it again
      let expandedId = action.postId === state.expandedId ? "" : action.postId
      return { ...state, expandedId }
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
    case DELETE_POST:
      newPostList = state.posts.filter(p_existing => {
        // remove the post from the list
        return p_existing.id === action.post.id
          ? {
              id: action.post.id,
              found: false
            }
          : p_existing
      })

      return {
        ...state,
        posts: newPostList, // no need to resort the array
        postMap: postsMap(newPostList),
        postsByCategory: postsByCategory(newPostList)
      }
    default:
      return state
  }
}

export default posts
