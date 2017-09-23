import { SET_SORT } from "../actions"

function local(state = { sort: "date" }, action) {
  switch (action.type) {
    case SET_SORT:
      return {
        ...state,
        sort: action.sort
      }
    default:
      return state
  }
}

export default local
