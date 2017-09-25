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
  fetch("http://localhost:3001/posts/" + post.id, {
    method: "PUT",
    headers: { Authorization: "whatever-you-want" },
    body: JSON.stringify({
      title: post.title,
      body: post.body
    })
  })
}

export const fetchComments = postId =>
  fetch("http://localhost:3001/posts/" + postId + "/comments", {
    headers: { Authorization: "whatever-you-want" }
  })
