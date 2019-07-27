import * as Types from "../constants/ActionTypes";

var initialState = [];
const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_SAMPLE_BY_LITIGANT_ID:
      state = action.sampleData;
      return [...state];
    default:
      return [...state];
  }
};

export default myReducer;
