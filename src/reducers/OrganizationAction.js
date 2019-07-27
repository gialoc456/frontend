
import * as Types from "./../constants/ActionTypes";


var initialState = [];

const findIndex = (organizations, id) =>{
    var result = 1;
    organizations.forEach((organization,index) => {
        if(organization.ID === id){
            result = index;
        }
    });
    return result;
}

const myReducer = (state = initialState, action) =>{
    var index = -1;
    var { organization } = action;    
    switch(action.type){
        case Types.GET_ORGANIZATION:
            state = action.organizationlist;
            return [...state];
        case Types.ADD_ORGANIZATION:
            state.push(action.organization);
            return [...state];    
        case Types.UPDATE_ORGANIZATION:
            index = findIndex(state,organization.ID);
            state[index] = organization;
            return [...state];
        case Types.SEARCH_ORGANIZATION:
            state = action.organizationlist;
            return [...state];        
         default:
             return [...state];    
    }
};



export default myReducer;

