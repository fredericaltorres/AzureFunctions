/*
    Selectors are functions that return piece of the global state.
    Selectors are function call, rather than hard code JSON path.
 */
export const getWeather = (state) => {
    return state.weather;
}
export function weatherTemperatureInfoSelector(state) {
    return getWeather(state).temperatureInfo;
}
export function weatherIsLoadingSelector(state) {
    return getWeather(state).isLoading;
}