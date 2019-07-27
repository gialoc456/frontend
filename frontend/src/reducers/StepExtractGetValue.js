import * as Types from "../constants/ActionTypes";

var initialState = {};
const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_VALUE_EXTRACT_STEP_BY_SAMPLE_ID:
      console.log(action.extractValueStepData)
      state = action.extractValueStepData;
      return state;
  
    default:
      return state;
  }
};

export default myReducer;
