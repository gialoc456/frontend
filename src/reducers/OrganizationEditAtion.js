import * as Types from './../constants/ActionTypes';

var initialState = {};

const myReducer = (state = initialState, action) =>{
    switch(action.type){
        case Types.EDIT_ORGANIZATION:
            state = action.organization;
            return state;
        default:
            return state;
    }
}

export default myReducer;