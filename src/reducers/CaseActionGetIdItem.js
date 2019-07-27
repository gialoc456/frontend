import * as Types from "../constants/ActionTypes";

var initialState = {};
const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_CASE_ID:
      state = action.caseIdItem;

      return state;

    default:
      return state;
  }
};

export default myReducer;
