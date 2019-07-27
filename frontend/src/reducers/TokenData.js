import * as Types from "../constants/ActionTypes";

var initialState = {};
const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.DATA_FROM_TOKEN:
      state = action.dataToken;
      return state;

    default:
      return state;
  }
};

export default myReducer;
