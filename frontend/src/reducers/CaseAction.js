import * as Types from "../constants/ActionTypes";
import { findIndex } from "lodash";
var initialState = [];
const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_CASE:
      state = action.caselist;
      return [...state];

    case Types.ADD_CASE:
      state.push(action.Case);
      return [...state];
    // case Types.DELETE_CASE:
    //   var index = findIndex(state, Case => {
    //     return Case.id === action.id;
    //   });

    //   state.splice(index, 1);
    //   return [...state];
    case Types.DELETE_CASE:
      var index = findIndex(state, Case => {
        return Case.ID === action.id;
      });

      state.splice(index, 1);
      return [...state];
    default:
      return [...state];
  }
};

export default myReducer;
