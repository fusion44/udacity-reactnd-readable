import * as Util from "../util"

export const ADD_COMMENT = "ADD_COMMENT"

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
