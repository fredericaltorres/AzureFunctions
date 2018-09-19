import React from "react";
import appConstants from "common/appConstants";
import { Link } from "react-router-dom";
import Loader from "components/loader/Loader";
import UserDisplay from "./UserDisplay";
import UserListControlsContainer from "./UserListControlsContainer";
import "./user-list.css";

const renderer = ({ users, loadAdditionalUsers, userClickHandler }) => (
	<section>
		<h3>user list</h3>
		<UserListControlsContainer />
		<ul className="user-list">
			{users.map(user => (
				<li key={user[appConstants.keyAttribute]}>
					<Link to={`/users/${user[appConstants.keyAttribute]}`}>
						<UserDisplay user={user} />
					</Link>
				</li>
			))}
		</ul>
	</section>
);

const UserList = props => {
	return <Loader {...props} shouldLoad={!!!props.users} renderer={renderer} />;
};
export default UserList;
