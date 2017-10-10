import * as Util from "../util"

export const RECEIVE_COMMENT = "RECEIVE_COMMENT"
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS"
export const EDIT_COMMENT = "EDIT_COMMENT"
export const RESET_COMMENT_EDITOR = "RESET_COMMENT_EDITOR"

export function receiveComment(comment) {
  return {
    type: RECEIVE_COMMENT,
    comment
  }
}

export function receiveComments(postId, comments) {
  return {
    type: RECEIVE_COMMENTS,
    postId,
    comments
  }
}

/**
 * If it is a new comment, isNew must be true and the commentId argument will be ignored
 */
export const editComment = (isNew, postId, commentId, author, body) => {
  return {
    type: EDIT_COMMENT,
    editedComment: {
      isNew,
      postId,
      commentId,
      author,
      body
    }
  }
}

export const resetCommentEditor = () => {
  return {
    type: RESET_COMMENT_EDITOR
  }
}

export const fetchComments = postId => dispatch => {
  Util.fetchComments(postId)
    .then(comments => comments.json())
    .then(commentsJSON => dispatch(receiveComments(postId, commentsJSON)))
}

export const voteComment = (comment, vote) => dispatch =>
  Util.voteComment(comment, vote).then(result => {
    dispatch(receiveComment(result))
  })

export const submitComment = (
  isNew,
  commentId,
  body,
  author,
  parentId
) => dispatch => {
  isNew
    ? Util.submitNewComment(body, author, parentId).then(comment => {
        dispatch(receiveComment(comment))
        dispatch(resetCommentEditor())
      })
    : Util.submitEditedComment(commentId, body)
        .then(comment => comment.json())
        .then(commentJSON => {
          dispatch(receiveComment(commentJSON))
          dispatch(resetCommentEditor())
        })
}
