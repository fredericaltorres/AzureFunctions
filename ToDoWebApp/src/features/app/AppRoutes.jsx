import React from "react";
import { Route } from "react-router-dom";
import HomePage from "scenes/HomePage";
import AboutPage from "scenes/AboutPage";
import DeviceInfoPage from "../../scenes/DeviceInfoPage";

export default () => (
	<div style={{marginTop:'5px'}}>
		<Route exact path="/about-us" component={AboutPage} />
		<Route exact path="/deviceinfo" component={DeviceInfoPage} />
		<Route exact path="/" component={HomePage} />
	</div>
);
