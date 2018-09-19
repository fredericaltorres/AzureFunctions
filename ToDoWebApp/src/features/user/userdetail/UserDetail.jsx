import React from "react";
import customPropTypes from "common/customPropTypes";

const propTypes = {
	user: customPropTypes.user
};

const UserDetail = ({ user }) =>
	user ? (
		<div>
			<h2>User {user.displayName}</h2>
			{JSON.stringify(user)}
		</div>
	) : (
		<strong>Unable to find user</strong>
	);
UserDetail.displayName = "UserDetail";
UserDetail.propTypes = propTypes;
export default UserDetail;
