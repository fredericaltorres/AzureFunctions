import React from "react";

const UserListControls = ({ loadAdditionalUsers, setUserSortKey, isLoadingUsers }) => (
	<section>
		<button onClick={() => loadAdditionalUsers()} disabled={isLoadingUsers}>
			Load MORE!
		</button>
		<button onClick={() => setUserSortKey("name.first")}>First Name Sort</button>
		<button onClick={() => setUserSortKey("name.last")}>Last Name Sort</button>
	</section>
);

UserListControls.displayName = "UserListControls";

export default UserListControls;
