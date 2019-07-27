import * as Types from "../constants/ActionTypes";

var initialState = {};
const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_PURIFY_STEP_BY_SAMPLE_ID:
      state = action.purifyStepDataFromSampleId;
      return state;
    case Types.ADD_PURIFY_STEP_BY_SAMPLE_ID:
      state = action.purifyStepData;
      return state;

    default:
      return state;
  }
};

export default myReducer;
