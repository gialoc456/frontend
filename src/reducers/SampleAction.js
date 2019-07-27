import * as Types from "./../constants/ActionTypes";
import { findIndex } from "lodash";
var initialState = [];
const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_SAMPLE_BY_CASE_ID:
      state = action.samplelistbycaseid;
      return [...state];
    case Types.ADD_SAMPLE:
      state.push(action.sampleItem);
      return [...state];
    case Types.UPDATE_SAMPLE_STATUS:
     
      var index = findIndex(state, sample => {
        return sample.id === action.statusData.id;
      });
      state[index] = action.statusData;
      return [...state];
      // case Types.GET_SAMPLE_FILTER_BY_ID_CODE:
      //   state = action.sampleFilterByIdCode
      //   return [...state];
     
    // case Types.DELETE_SAMPLE:
    //   var index = findIndex(state, code => {
    //     return code.id === action.id;
    //   });

    //   state.splice(index, 1);
    //   return [...state];
    default:
      return [...state];
  }
};

export default myReducer;
