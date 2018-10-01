import React from "react";
import PropTypes from "prop-types";
import tracer from '../../common/Tracer';
import {
    browserName, 
    isMobile,
	fullBrowserVersion,
	isIOS,
	isAndroid,
	osVersion,
	osName,
} from 'react-device-detect';

// https://www.npmjs.com/package/react-device-detect
class DeviceInfo extends React.PureComponent {	
	static propTypes = {
        aa:PropTypes.number
	};
	state = {
		timeStamp: new Date().getTime(),
	};
	constructor() {

		super();
		this.name = "DeviceInfo";
		tracer.log('constructor', this);
	}
	forceRefresh = () => {

		const timeStamp = new Date().getTime();
		const newState = {
			...this.state,
			timeStamp
		}
		tracer.log(`forceRefresh ${JSON.stringify(newState)}`, this);
		this.setState(newState);
	}
	render() {

        const values = [
            { isMobile },
            { browserName },
            { fullBrowserVersion },
            { isIOS },
            { isAndroid },
            { osVersion },
            { osName },
        ];

        const rows = values.map((v) => {
            const name = Object.keys(v)[0];
            const val = v[name];
            return (<tr key={name}>
                    <td>{name}</td>
                    <td>{val.toString()}</td>
                </tr>
            );      
        });

        return  <table className="table table-borderless">
            <thead>
                <tr>
                    <th style={{ backgroundColor:'Gray'}} colSpan="2">Device Information</th>
                </tr>
                <tr>
                    <th>Name</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
        </table>;
	}
}

export default DeviceInfo;

