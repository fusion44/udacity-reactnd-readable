import React from "react"
import PostItem from "./PostItem"

const genPosts = props => {
  if (!props.posts) {
    return <h1>Loading ...</h1>
  } else {
    let postsItems = []
    postsItems.push(
      props.posts.map((post, index) => {
        return <PostItem postId={post.id} key={index + 1} />
      })
    )

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
