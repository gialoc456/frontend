import * as Types from "../constants/ActionTypes";

var initialState = [];
const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_PURIFY_LOG_BY_SAMPLE_ID:
      state = action.logData;
      return [...state];
    default:
      return [...state];
  }
};

export default myReducer;
