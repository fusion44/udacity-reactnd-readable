import * as Util from "../util"

export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES"
export const SET_CATEGORY = "SET_CATEGORY"

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
})

export const fetchCategories = () => dispatch => {
  Util.fetchCategories()
    .then(categories => categories.json())
    .then(catsJSON => dispatch(receiveCategories(catsJSON)))
}

export const setCategory = current => ({
  type: SET_CATEGORY,
  current
})
