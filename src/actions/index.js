import {
  RECEIVE_CATEGORIES,
  SET_CATEGORY,
  receiveCategories,
  fetchCategories,
  setCategory
} from "./categories"

import {
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  addComment,
  fetchComments
} from "./comments"

import {
  RECEIVE_POSTS,
  RECEIVE_POST,
  ADD_POST,
  UPDATE_POST,
  receivePosts,
  receivePost,
  addPost,
  fetchPosts,
  fetchPost,
  updatePost
} from "./posts"

import { SET_SORT, setSort } from "./local.js"

export {
  // Categories
  RECEIVE_CATEGORIES,
  SET_CATEGORY,
  receiveCategories,
  fetchCategories,
  setCategory
}

export {
  // Posts
  RECEIVE_POSTS,
  RECEIVE_POST,
  ADD_POST,
  UPDATE_POST,
  receivePosts,
  receivePost,
  addPost,
  fetchPosts,
  fetchPost,
  updatePost
}

export {
  // comments
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  addComment,
  fetchComments
}

export {
  // local
  SET_SORT,
  setSort
}
