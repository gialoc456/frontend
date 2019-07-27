import * as Types from './../constants/ActionTypes';

var initialState = {};

const myReducer = (state = initialState, action) =>{
    switch(action.type){
        case Types.EDIT_KIT:
            state = action.kit;
            return state;
        default:
            return state;    
    }
}

export default myReducer;