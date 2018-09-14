import * as weatherActionTypes from './weatherActionTypes';
import axios from 'axios';

// Synchronous action, just return an object
export function weatherRequestStartedAction() {
    return { 
        type: weatherActionTypes.WEATHER_REQUEST_STARTED 
    };
}

// Synchronous action, just return an object
export function weatherReceivedAction(weatherData) {
    return { 
        type: weatherActionTypes.WEATHER_REQUEST_RECEIVED, 
        payload:  weatherData 
    };    
}

const WEATHER_DATA = {
    "id": 2210247,
    "name": "Tripoli",
    "coord": {
      "lon": 13.18746,
      "lat": 32.875191
    },
    "main": {
      "temp": 16,
      "pressure": 1025,
      "humidity": 59,
      "temp_min": 16,
      "temp_max": 16
    },
    "dt": 1485781822,
    "wind": {
      "speed": 3.6,
      "deg": 360
    },
    "clouds": {
      "all": 40
    },
    "weather": [
      {
        "id": 802,
        "main": "Clouds",
        "description": "scattered clouds",
        "icon": "03d"
      }
    ]
  };

// Asynchronous action, return a function that accept the dispatch() function
export function fetchWeatherAction(city) {

    const log = console.log;
    log(`weatherActions.fetchWeatherAction(), return function(dispatch)`);
    return function(dispatch) {

        log(`--- weatherActions.fetchWeatherAction().function(dispatch) city:${city}`);

        const actionToDispatch = weatherRequestStartedAction();
        log(`--- weatherActions.fetchWeatherAction().function(dispatch) dispatch(${JSON.stringify(actionToDispatch)})`);
        dispatch(actionToDispatch);

        const openWeatherMapApiKey = '38cbf6158456de03dd9624175380d50a';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=Imperial&appid=${openWeatherMapApiKey}`;

        log(`--- weatherActions.fetchWeatherAction().function(dispatch) HTTP.GET ${url} ----------`);

        axios.get(url).then(function(data) { 
            const actionToDispatch = weatherReceivedAction(data);
            log(`--- weatherActions.fetchWeatherAction().function(dispatch) received and dispatch data dispatch(${JSON.stringify(actionToDispatch)})`);
            dispatch(actionToDispatch);
        });

        // new Promise(resolve => {
        //     setTimeout(() => resolve(WEATHER_DATA), 1000);
        // })
        // .then(function(data) {

        //     //console.log(`--- weatherActions.fetchWeatherAction().function(dispatch) HTTP.GET data received user:${JSON.stringify(data)} `);
        //     const actionToDispatch = weatherReceivedAction(data);
        //     console.log(`--- weatherActions.fetchWeatherAction().function(dispatch) received and dispatch data dispatch(${JSON.stringify(actionToDispatch)})`);
        //     dispatch(actionToDispatch);
        // });
    }
}