import { combineReducers } from "redux"
import categories from "./categories"
import posts from "./posts"
import comments from "./comments"
import local from "./local"

export default combineReducers({
  categories,
  posts,
  comments,
  local
})
