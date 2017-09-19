import { RECEIVE_CATEGORIES, SET_CATEGORY } from "../actions"

function checkCurrentCategory(categories, current) {
  if (current === "all" || categories === undefined) {
    return false
  } else {
    // negated because we do not want to show an error
    // when the category was found
    // array.some() stops as soon as one iteration
    // returns true
    return !categories.some(element => {
      if (element.name === current) return true
      else return false
    })
  }
}

function categories(
  state = { current: "all", showCategoryError: false },
  action
) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      const { categories } = action.categories
      return {
        ...state,
        categories,
        showCategoryError: checkCurrentCategory(categories, state.current)
      }
    case SET_CATEGORY:
      const { current } = action
      return {
        ...state,
        current,
        showCategoryError: checkCurrentCategory(state.categories, current)
      }
    default:
      return state
  }
}

export default categories
