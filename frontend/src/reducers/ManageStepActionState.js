import * as Types from "./../constants/ActionTypes";

var initialState = [];
const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_SAMPLE_BY_CODE_ID:
      state = action.samplelistbycodeid;
      return [...state];
    case Types.ADD_SAMPLE:
      state.push(action.sampleItem);
      return [...state];
    
    default:
      return [...state];
  }
};

export default myReducer;
