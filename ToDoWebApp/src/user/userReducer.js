import * as userActionTypes from './userActionTypes';

const defaultState = { isLoading: false, userData: 'No user...' };
const userReducer = (state = defaultState, action) => {
    
    const logOn = !action.type.startsWith('@@redux');
    

    let newState = null;
    switch (action.type) {
        case userActionTypes.USER_REQUEST_STARTED:
            newState = {
                ...state,
                isLoading: true,
            };
            break;
        case userActionTypes.USER_RECEIVED:
            newState = {
                ...state,
                userData: action.payload.user,
                isLoading: false,
            };
            break;
        default:
            newState = state;
            if(logOn) console.log(`userReducer action.type:${action.type} Ignored`);
            return newState;
            break;
    }
    if(logOn) console.log(`userReducer old-state:${JSON.stringify(state)} action:${JSON.stringify(action)}`);
    if(logOn) console.log(`userReducer new-state:${JSON.stringify(newState)} `);
    return newState;
}

export default userReducer;