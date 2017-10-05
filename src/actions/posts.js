import * as Util from "../util"

export const SET_SORT = "SET_SORT"
export const RECEIVE_POSTS = "RECEIVE_POSTS"
export const RECEIVE_POST = "RECEIVE_POST"
export const ADD_POST = "ADD_POST"

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
