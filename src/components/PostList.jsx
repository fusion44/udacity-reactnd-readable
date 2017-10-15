import React from "react"
import PostItem from "./PostItem"

const genPosts = props => {
  if (!props.posts) {
    return <h1>Loading ...</h1>
  } else {
    let postsItems = props.posts
      .filter(post => {
        return post.found
      })
      .map((post, index) => {
        return <PostItem postId={post.id} key={index + 1} />
      })

    return postsItems
  }
}

const PostList = posts => {
  return (
    <div style={{ padding: 20 }} className="App">
      {genPosts(posts)}
    </div>
  )
}

export default PostList
