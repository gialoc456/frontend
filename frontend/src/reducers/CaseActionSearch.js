import * as Types from "../constants/ActionTypes";

var initialState = {
  name: ""
};
const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SEARCH_CASE:
      state = action.filter;

      return state;

    default:
      return state;
  }
};

export default myReducer;
