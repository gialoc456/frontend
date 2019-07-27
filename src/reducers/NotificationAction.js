import * as Types from "../constants/ActionTypes";

var initialState = [];

const myReducer = (state = initialState, action) =>{
    switch(action.type){
        case Types.CREATE_NOTIFICATION:
            state.push(action.notification);
            return [...state];
        case Types.CREATE_NOTIFICATION_ERROR:
            console.log('Create notification error', action.error); 
            return [...state];     
        default:
            return [...state];    
    }
};
 
export default myReducer;