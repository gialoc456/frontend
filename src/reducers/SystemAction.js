import * as Types from "./../constants/ActionTypes";

var initialState = [];

const findIndex = (systems, id) =>{
    var result = 1;
    systems.forEach((systems,index) => {
        if(systems.ID === id){
            result = index;
        }
    });
    return result;
}


const myReducer = (state = initialState, action) =>{
    var index = 1;
    var { system } = action;
    switch(action.type){
        case Types.GET_SYSTEM:
            state = action.systemlist;
            return [...state];
        case Types.ADD_SYSTEM:
            state.push(action.system);
            return [...state];
        case Types.UPDATE_SYSTEM:
            index = findIndex(state,system.ID);
            state[index] = system;
            return [...state]; 
        case Types.SEARCH_SYSTEM:
            state = action.systemlist;
            return [...state];      
        default:
            return [...state];        
    }
};

export default myReducer;