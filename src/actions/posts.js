import * as Util from "../util"

export const EXPAND_POST = "EXPAND_POST"
export const SET_SORT = "SET_SORT"
export const RECEIVE_POSTS = "RECEIVE_POSTS"
export const RECEIVE_POST = "RECEIVE_POST"
export const DELETE_POST = "DELETE_POST"
export const ADD_POST = "ADD_POST"

export const deletePost = post => dispatch => {
  return Util.deletePost(post).then(result => {
    dispatch({
      type: DELETE_POST,
      post
    })
  })
}

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
})

export const receivePost = post => ({
  type: RECEIVE_POST,
  post
})

export function setSort(sort) {
  return {
    type: SET_SORT,
    sort
  }
}

export function toggleExpandPost(postId) {
  return {
    type: EXPAND_POST,
    postId
  }
}

export const fetchPosts = () => dispatch => {
  Util.fetchPosts()
    .then(posts => posts.json())
    .then(postsJSON => dispatch(receivePosts(postsJSON)))
}

export const fetchPost = postId => dispatch => {
  Util.fetchPost(postId)
    .then(post => post.json())
    .then(postJSON => dispatch(receivePost(postJSON)))
}

export function addPost({ id, timestamp, title, body, owner, category }) {
  return {
    type: ADD_POST,
    id,
    timestamp,
    title,
    body,
    owner,
    category
  }
}

export const votePost = (post, vote) => dispatch =>
  Util.votePost(post, vote).then(result => {
    dispatch(receivePost(result))
  })
