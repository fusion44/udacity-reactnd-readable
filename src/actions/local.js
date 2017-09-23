/*
This is for all actions I'd most likely keep in the component state
Due to the requirement of the project rubric I have to manage these with redux
*/

export const SET_SORT = "SET_SORT"

export function setSort(sort) {
  return {
    type: SET_SORT,
    sort
  }
}
