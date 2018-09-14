import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware  from 'redux-thunk';

import counterReducer   from './counter/counterReducer';
import userReducer      from './user/userReducer';
import weatherReducer   from './weather/weatherReducer';

const rootReducer = combineReducers({
    counter : counterReducer,
    user    : userReducer,
    weather : weatherReducer,
});

const composeEnhancers  = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware        = [thunkMiddleware];
const store             = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(...middleware)));

store.subscribe(function(){
    //console.log('STORE SUBSCRIBED ');
});

//store.dispatch({type:'WEATHER_REQUEST_STARTED'});

export default store;
