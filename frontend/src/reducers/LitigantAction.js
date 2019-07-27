import * as Types from "./../constants/ActionTypes";

var initialState = [];


const findIndex = (litigants, id) =>{
    var result = 1;
    litigants.forEach((kit,index) => {
        if(kit.ID === id){
            result = index;
        }
    });
    return result;
}


const myReducer = (state = initialState, action) =>{
    var index = 1;
    var { litigant } = action;
    switch(action.type){
        case Types.GET_LITIGANT:
            state = action.litigantlist;
            return [...state];
        case Types.ADD_LITIGANT:
            state.push(action.litigant);
            console.log(state);
            return [...state];
        case Types.UPDATE_LITIGANT:
            index = findIndex(state, litigant.ID);
            state[index] = litigant;
            return [...state];    
        case Types.SEARCH_LITIGANT:
            state = action.litigantlist;
            return [...state];    
        default:
            return [...state];        
    }
};

export default myReducer;