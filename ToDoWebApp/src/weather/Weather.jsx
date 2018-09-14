import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as weatherActions from './weatherActions';
import * as weatherSelector from './weatherSelector';
import TemperatureInfo from './TemperatureInfo';

const CITIES = ['', 'Boston', 'London', 'Paris', 'New York'];

class Weather extends Component {

    constructor() {
        console.log(`Component Weather.constructor()`);
        super();
    }

    componentWillMount() {
        
    }

    onChangeCityName = (e) => {

        let v = null;
        if(e && e.target && e.target.value) 
            v = e.target.value;
        else
            v = e;

        console.log(`onChangeCityName city:${v}`);      

        const { fetchWeatherAction } = this.props;
        fetchWeatherAction(v);      
    }

    getCityComboBoxHtml() {

        let cityOptions = CITIES.map(c => {
            return <option key={c} value={c}> {c} </option>
        });
        return (
            <select className="form-control" onChange={this.onChangeCityName} ref="cityName">
                {cityOptions}
            </select>
        );
    }

    getComponentFooterHtml() {

        const { fetchWeatherAction } = this.props;
        return (
            <div>
                <br/>
                {this.getCityComboBoxHtml()}
                {/* <button onClick={fetchWeatherAction}>Fetch</button> */}
            </div>
        );
    }

    render() {

        console.log(`Component Weather.render()`);

        const weatherHtmlTile = <div>
            <h3>City Weather - openWeatherMap.org</h3>
        </div>;

        const { isUserLoading, temperatureInfo } = this.props;

        if (isUserLoading) {
            return ( 
                <div>
                    {weatherHtmlTile}
                    Loading data...
                    {this.getComponentFooterHtml()}
                </div>
            );
        }
        else if(!temperatureInfo.main) {
            return ( 
                <div>
                    {weatherHtmlTile}
                    No data
                    {this.getComponentFooterHtml()}
                </div> 
            );
        }
        else {
            return ( 
                <div>
                    {weatherHtmlTile}
                    <TemperatureInfo temperatureInfo={temperatureInfo}/>
                    {this.getComponentFooterHtml()}
                </div>
            );
        }
    }
}

Weather.defaultProps = {
    temperatureInfo: {},
};

// Define mapping between global state to prop with selector
const mapStateToProps = function(state) {
    const m = {
        temperatureInfo :   weatherSelector.weatherTemperatureInfoSelector(state),
        isUserLoading:      weatherSelector.weatherIsLoadingSelector(state),
    };
    console.log(`Component Weather.mapStateToProps() state:${JSON.stringify(state)} return ${JSON.stringify(m)}`);
    return m;
}

const mapDispatchToProps = {
    fetchWeatherAction:  weatherActions.fetchWeatherAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Weather);

