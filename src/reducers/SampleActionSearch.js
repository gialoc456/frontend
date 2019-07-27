import * as Types from "./../constants/ActionTypes";

var initialState = {
  keyword: ""
};
const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SEARCH_SAMPLE:
      state = action.keyword;
       
      return state;

    default:
      return state;
  }
};

export default myReducer;
