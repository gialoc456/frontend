import * as Types from "../constants/ActionTypes";

var initialState = [];
const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_RESULT_STEP_BY_SAMPLE_ID:
      state = action.resultStepDataFromSampleId;
      return [...state];
    case Types.ADD_RESULT_STEP_BY_SAMPLE_ID:
      state.push(action.resultStepData);
      return [...state];

    default:
      return [...state];
  }
};

export default myReducer;
