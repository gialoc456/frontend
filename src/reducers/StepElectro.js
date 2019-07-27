import * as Types from "../constants/ActionTypes";

var initialState = {};
const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_ELECTRO_STEP_BY_SAMPLE_ID:
      state = action.electroStepDataFromSampleId;
      return state;
    case Types.ADD_ELECTRO_STEP_BY_SAMPLE_ID:
      state = action.electroStepData;
      return state;

    default:
      return state;
  }
};

export default myReducer;
