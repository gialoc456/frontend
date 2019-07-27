import * as Types from "./../constants/ActionTypes";

var initialState = {};
const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.VIEW_SAMPLE:
      state = action.sampleIdItem;
      return state;
    default:
      return state;
  }
};

export default myReducer;
