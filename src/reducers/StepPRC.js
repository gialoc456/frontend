import * as Types from "../constants/ActionTypes";

var initialState = {};
const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_PRC_STEP_BY_SAMPLE_ID:
      state = action.prcStepDataFromSampleId;
      return state;
    case Types.ADD_PRC_STEP_BY_SAMPLE_ID:
      state = action.prcStepData;
      return state;

    default:
      return state;
  }
};

export default myReducer;
