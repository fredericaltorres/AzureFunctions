import React from "react";
import { NavLink } from "react-router-dom";
import "./siteNavBar.css";

const SiteNavBar = () => (
	<nav className="site-navigation">
		<NavLink to="/">Home</NavLink>
		<NavLink to="/about-us">About</NavLink>
		{/* <NavLink to="/users">Users</NavLink> */}
	</nav>
);

export default SiteNavBar;
