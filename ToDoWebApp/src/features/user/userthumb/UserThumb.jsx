import React from "react";

const UserThumb = ({ user }) => (
	<img src={user.picture.thumbnail} alt={user.displayName} className="user-thumb" />
);

UserThumb.displayName = "UserThumb";
export default UserThumb;
