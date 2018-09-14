import * as userActionTypes from './userActionTypes';

const userObj = {
    name: 'John Doe',
    email: 'example@email.com'
};

// Synchronous action, just return an object
export function userRequestStarted() {
    const m = { type: userActionTypes.USER_REQUEST_STARTED };
    return m;
};

// Synchronous action, just return an object
export function userReceivedAction  (userData) {
    const m = { 
        type: userActionTypes.USER_RECEIVED, 
        payload: { user: userData } 
    };
    return m;
};

// Asynchronous action, return a function that accept the dispatch() function
export function fetchUserAction() {

    console.log(`userActions.fetchUserAction(), return function(dispatch)`);

    return function(dispatch) {

        console.log(`--- userActions.fetchUserAction().function(dispatch)`);

        const actionToDispatch = userRequestStarted();
        console.log(`--- userActions.fetchUserAction().function(dispatch) dispatch(${JSON.stringify(actionToDispatch)})`);
        dispatch(actionToDispatch);

        new Promise(resolve => {

            console.log(`--- userActions.fetchUserAction().function(dispatch) HTTP.GET to get user data`);
            console.log(`--- Waiting for HTTP answer -----------------------------`);
            setTimeout(() => resolve(userObj),1000)
        })
        .then(function(user) {

            console.log(`--- userActions.fetchUserAction().function(dispatch) HTTP.GET data received user:${JSON.stringify(user)} `);

            const actionToDispatch = userReceivedAction(user);
            console.log(`--- userActions.fetchUserAction().function(dispatch) dispatch(${JSON.stringify(actionToDispatch)})`);
            dispatch(actionToDispatch);
        });
    }
}
