import React from "react";
import { NavLink } from "react-router-dom";
import "./siteNavBar.css";

const SiteNavBar = () => (
	// <nav className="site-navigation">
	// 	<NavLink to="/">Home</NavLink>
	// 	<NavLink to="/about-us">About</NavLink>
	// </nav>

	<nav className="navbar navbar-dark bg-primary">
		<a className="navbar-brand" href="#">To Do App</a>

		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
		</button>

		<div className="collapse navbar-collapse" id="navbarSupportedContent">
			<ul className="navbar-nav mr-auto">
				<li className="nav-item active">
					<a className="nav-link" href="/">Home</a>
					<a className="nav-link" href="/deviceinfo">Device Info</a>
					<a className="nav-link" href="/about-us">About</a>
				</li>
			</ul>
		</div>
	</nav>
);

export default SiteNavBar;
