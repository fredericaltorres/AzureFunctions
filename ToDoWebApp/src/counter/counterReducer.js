import * as counterActionTypes from './counterActionTypes';

const counterReducer = (state = { value: 0 }, action) => {

    const logOn = !action.type.startsWith('@@');
    let newState = null;

    switch (action.type) {
        case counterActionTypes.INCREMENT:
            newState = {
                ...state,
                value: state.value + 1
            };
            break;
        case counterActionTypes.DECREMENT:
            newState = {
                ...state,
                value: state.value - 1
            };
            break;
        default:
            if(logOn) console.log(`counterReducer action.type:${action.type} Ignored`);
            newState = state;
            return newState;
            break;
    }
    if(logOn) console.log(`counterReducer old-state:${JSON.stringify(state)} action:${JSON.stringify(action)}`);
    if(logOn) console.log(`counterReducer new-state:${JSON.stringify(newState)} `);
    return newState;
}

export default counterReducer;