import {
  SET_EDIT_POST,
  SET_EDITED_POST_CONTENT,
  EDIT_COMMENT_POPUP
} from "../actions"

function local(
  state = {
    edit_post: false,
    edited_post: { id: "", title: "", body: "" },
    editCommentPopup: { popupOpen: false, id: "", body: "" }
  },
  action
) {
  switch (action.type) {
    case SET_EDIT_POST:
      return {
        ...state,
        edit_post: action.edit_post
      }
    case SET_EDITED_POST_CONTENT:
      let newPost = { ...state.edited_post }

      if (action.post.hasOwnProperty("id")) {
        newPost.id = action.post.id
      }
      if (action.post.hasOwnProperty("title")) {
        newPost.title = action.post.title
      }
      if (action.post.hasOwnProperty("body")) {
        newPost.body = action.post.body
      }

      return {
        ...state,
        edited_post: newPost
      }
    case EDIT_COMMENT_POPUP:
      return {
        ...state,
        editCommentPopup: {
          popupOpen: action.popupOpen,
          id: action.id,
          body: action.body
        }
      }
    default:
      return state
  }
}

export default local
