/*
This is for all actions I'd most likely keep in the component state
Due to the requirement of the project rubric I have to manage these with redux
*/

import * as Util from "../util"
import { receivePost } from "./posts"

export const SET_EDIT_POST = "SET_EDIT_POST"
export const SET_EDITED_POST_CONTENT = "SET_EDITED_POST_CONTENT"
export const EDIT_COMMENT_POPUP = "EDIT_COMMENT_POPUP"
export const ADD_POST_DIALOG_CHANGE = "ADD_POST_DIALOG_CHANGE"

export function setEditPost(edit) {
  return {
    type: SET_EDIT_POST,
    edit_post: edit
  }
}

export function setEditedPostContent(post) {
  return {
    type: SET_EDITED_POST_CONTENT,
    post
  }
}

export const putEditPost = post => (dispatch, state) => {
  const { edited_post } = state().local
  Util.updatePost(edited_post)
    .then(post => {
      post.found = true
      dispatch(receivePost(post))
    })
    .catch(error => console.log(error))
}

export const editCommentPopUp = (popupOpen, id, body) => {
  return {
    type: EDIT_COMMENT_POPUP,
    popupOpen,
    id,
    body
  }
}

/**
 * @param {boolean} dialogOpen - Whether dialog is currently shown
 * @param {string} title - Title of the post
 * @param {string} body - Body of the post
 * @param {string} author - Author of the post
 * @param {string} category - Category of the post
 */
export const addPostDialogChange = (
  dialogOpen,
  category,
  author,
  title,
  body
) => {
  return {
    type: ADD_POST_DIALOG_CHANGE,
    dialogOpen,
    category,
    author,
    title,
    body
  }
}

export const submitPost = () => (dispatch, state) => {
  const { title, body, author, category } = state().local.addPostDialogState
  Util.submitPost(category, author, title, body)
    .then(result => {
      result.found = true
      dispatch(receivePost(result))
    })
    .catch(error => console.log(error))
}
