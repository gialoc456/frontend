import * as Types from "../constants/ActionTypes";

var initialState = {};
const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_EXTRACT_STEP_BY_SAMPLE_ID:
      state = action.extractStepDataFromSampleId;
      return state;
    case Types.ADD_EXTRACT_STEP_BY_SAMPLE_ID:
      state = action.extractStepData
      return state;

    default:
      return state;
  }
};

export default myReducer;
