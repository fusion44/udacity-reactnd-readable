const headers = {
  Authorization: "whatever-you-want"
}

export const fetchCategories = () =>
  fetch("http://localhost:3001/categories", {
    headers: { Authorization: "whatever-you-want" }
  })

export const fetchPosts = () =>
  fetch("http://localhost:3001/posts", {
    headers: { Authorization: "whatever-you-want" }
  })

export const fetchPost = postID =>
  fetch("http://localhost:3001/posts/" + postID, {
    headers: { Authorization: "whatever-you-want" }
  })

export const updatePost = post => {
  return fetch(`http://localhost:3001/posts/${post.id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title: post.title, body: post.body })
  }).then(response => response.json())
}

export const fetchComments = postId =>
  fetch("http://localhost:3001/posts/" + postId + "/comments", {
    headers: { Authorization: "whatever-you-want" }
  })
