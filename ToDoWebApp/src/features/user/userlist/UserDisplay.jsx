import React from "react";
import UserThumb from "features/user/userthumb/UserThumb";
import "./user-display.css";

const UserDisplay = ({ user }) => (
	<div className="user-display">
		<UserThumb user={user} />
		<span className="user-display-name">{user.displayName}</span>
	</div>
);

UserDisplay.displayName = "UserDisplay";
export default UserDisplay;
