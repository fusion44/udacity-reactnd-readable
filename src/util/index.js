export const fetchCategories = () =>
  fetch("http://localhost:3001/categories", {
    headers: { Authorization: "whatever-you-want" }
  })

export const fetchPosts = () =>
  fetch("http://localhost:3001/posts", {
    headers: { Authorization: "whatever-you-want" }
  })
