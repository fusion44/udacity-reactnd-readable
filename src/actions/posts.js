import * as Util from "../util"

export const RECEIVE_POSTS = "RECEIVE_POSTS"
export const ADD_POST = "ADD_POST"

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
})

export const fetchPosts = () => dispatch => {
  Util.fetchPosts()
    .then(posts => posts.json())
    .then(postsJSON => dispatch(receivePosts(postsJSON)))
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
