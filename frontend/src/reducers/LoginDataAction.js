import * as Types from "../constants/ActionTypes";

var initialState = {};
const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.DATA_LOGIN:
      state = action.dataLogin;
      return state;
    case Types.DELETE_DATA_LOGIN:
      state = null;
      return state;
    default:
      return state;
  }
};

export default myReducer;
