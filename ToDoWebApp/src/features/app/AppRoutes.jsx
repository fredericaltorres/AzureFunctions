import React from "react";
import { Route } from "react-router-dom";
import HomePage from "scenes/HomePage";
import AboutPage from "scenes/AboutPage";
import UserIndexPage from "scenes/users/UserIndexPage";

export default () => (
	<main>
		<Route exact path="/about-us" component={AboutPage} />
		{/* <Route path="/users" component={UserIndexPage} /> */}
		<Route exact path="/" component={HomePage} />
	</main>
);
