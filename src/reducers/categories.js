import { RECEIVE_CATEGORIES, SET_CATEGORY } from "../actions"

function categories(state = { current: "all" }, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      const { categories } = action.categories
      return {
        ...state,
        categories
      }
    case SET_CATEGORY:
      const { current } = action
      return {
        ...state,
        current
      }
    default:
      return state
  }
}

export default categories
