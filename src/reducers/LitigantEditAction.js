import * as Types from './../constants/ActionTypes';

var initialState = {};

const myReducer = (state = initialState, action) =>{
    switch(action.type){
        case Types.EDIT_LITIGANT:
            state = action.litigant;
            return state;
        default:
            return state;
    }
}

export default myReducer;