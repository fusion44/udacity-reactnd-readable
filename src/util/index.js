const uuidv1 = require("uuid/v1")

const URL = "http://localhost:3001"

const headers = {
  Authorization: "whatever-you-want"
}

export const fetchCategories = () => fetch(`${URL}/categories`, { headers })

export const fetchPosts = () => fetch(`${URL}/posts`, { headers })

export const fetchPost = postID => fetch(`${URL}/posts/${postID}`, { headers })

export const votePost = (post, vote) => {
  return fetch(`${URL}/posts/${post.id}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ option: vote })
  }).then(response => response.json())
}

export const updatePost = post => {
  return fetch(`${URL}/posts/${post.id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title: post.title, body: post.body })
  }).then(response => response.json())
}

export const fetchComments = postId =>
  fetch(`${URL}/posts/${postId}/comments`, { headers })

export const voteComment = (comment, vote) => {
  return fetch(`${URL}/comments/${comment.id}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ option: vote })
  }).then(response => response.json())
}

export const submitNewComment = (body, author, parentId) => {
  return fetch(`${URL}/comments`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: uuidv1(),
      timestamp: Date.now(),
      body,
      author,
      parentId
    })
  }).then(response => response.json())
}

export const submitEditedComment = (commentId, body) => {
  return fetch(`${URL}/comments/${commentId}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ timestamp: Date.now(), body })
  }).then(response => response.json())
}
