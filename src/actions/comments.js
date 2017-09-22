import * as Util from "../util"

export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS"
export const ADD_COMMENT = "ADD_COMMENT"

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
