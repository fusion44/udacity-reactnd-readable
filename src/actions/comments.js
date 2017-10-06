import * as Util from "../util"

export const RECEIVE_COMMENT = "RECEIVE_COMMENT"
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS"
export const ADD_COMMENT = "ADD_COMMENT"

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

export const fetchComments = postId => dispatch => {
  Util.fetchComments(postId)
    .then(comments => comments.json())
    .then(commentsJSON => dispatch(receiveComments(postId, commentsJSON)))
}

export function addComment({
  parentId,
  body,
  author,
  voteScore,
  deleted,
  parentDeleted
}) {
  return {
    type: ADD_COMMENT,
    parentId,
    body,
    author,
    voteScore,
    deleted,
    parentDeleted
  }
}

export const voteComment = (comment, vote) => dispatch =>
  Util.voteComment(comment, vote).then(result => {
    dispatch(receiveComment(result))
  })
