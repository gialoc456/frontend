import * as Types from "./../constants/ActionTypes";


var initialState = [];

const findIndex = (kits, id) =>{
    var result = 1;
    kits.forEach((kit,index) => {
        if(kit.ID === id){
            result = index;
        }
    });
    return result;
}

const myReducer = (state = initialState, action) =>{
    var index = -1;
    var { kit } = action;
    switch(action.type){
        case Types.GET_KIT:
            state = action.kitlist;
            return [...state];
        case Types.ADD_KIT:
            state.push(action.kit);
            return [...state];    
        case Types.UPDATE_KIT:
            index = findIndex(state,kit.ID);
            state[index] = kit;
            return [...state];
        case Types.SEARCH_KIT:
            state = action.kitlist;
            return [...state];        
        default:
            return [...state];    
    }
};



export default myReducer;