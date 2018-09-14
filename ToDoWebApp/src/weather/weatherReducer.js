import * as weatherActionTypes from './weatherActionTypes';
// import TraceRedux from '../common/TraceRedux'

const weatherReducer = (state = { isLoading: false  }, action) => {
    
    const logOn = !action.type.startsWith('@@redux');
    
    
    let newState = null;
    switch (action.type) {
        case weatherActionTypes.WEATHER_REQUEST_STARTED:
            newState = {
                ...state,
                isLoading: true,
            };
            break;
        case weatherActionTypes.WEATHER_REQUEST_RECEIVED:
            newState = {
                ...state,
                temperatureInfo: action.payload.data,
                isLoading: false,
            };
            break;
        default:
            newState = state;
            if(logOn) console.log(`weatherReducer action.type:${action.type} Ignored`);
            return newState;
            break;
    }
    if(logOn) console.log(`weatherReducer old-state:${JSON.stringify(state)} action:${JSON.stringify(action)}`);
    if(logOn) console.log(`weatherReducer new-state:${JSON.stringify(newState)} `);
    return newState;
}

export default weatherReducer;