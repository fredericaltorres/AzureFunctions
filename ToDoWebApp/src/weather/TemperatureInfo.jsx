import React, { Component } from 'react';
import { connect } from 'react-redux';

class TemperatureInfo extends Component {

    constructor() {
        console.log(`Component TemperatureInfo.constructor()`);
        super();
	}
	
	renderTR(name, value, isHeader) {
		if(isHeader)
			return <tr><th>{name}</th><th>{value}</th></tr>;
		else
			return <tr><td>{name}</td><td>{value}</td></tr>;
	}

    render() {
		const { temperatureInfo } = this.props;
        return (
            <div>
				<table border="1" cellpadding="1" cellspacing="0"> 
					{this.renderTR('Name', 'Value', true)}
					{this.renderTR('City', temperatureInfo.name)}
					{this.renderTR('Temperature', temperatureInfo.main.temp)}
					{this.renderTR('Pressure', temperatureInfo.main.pressure)}
					{this.renderTR('Humidity', temperatureInfo.main.humidity)}
					{this.renderTR('Description', temperatureInfo.weather[0].description)}
					{this.renderTR('Wind Speed', temperatureInfo.wind.speed)}
				</table>
            </div>
        );
    }
}

TemperatureInfo.defaultProps = {
    temperatureInfo: {},
};

export default TemperatureInfo;