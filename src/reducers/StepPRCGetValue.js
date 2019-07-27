import * as Types from "../constants/ActionTypes";

var initialState = {};
const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_VALUE_PRC_STEP_BY_SAMPLE_ID:
      state = action.prcValueStepData;
      return state;
  
    default:
      return state;
  }
};

export default myReducer;
