import * as Types from "../constants/ActionTypes";

var initialState = {
    name:""
};
const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.FILTER_BY_NAME_SYSTEM:
      state = action.dataName;
      return state;
    default:
      return state;
  }
};

export default myReducer;
