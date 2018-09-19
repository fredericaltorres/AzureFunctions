import React from "react";
import { Route, Switch } from "react-router-dom";
import UserListPage from "scenes/users/UserListPage";
import UserDetailPage from "scenes/users/UserDetailPage";

export default ({ match }) => (
	<div>
		<h1>Users</h1>
		<Switch>
			<Route exact path={`${match.path}/`} component={UserListPage} />
			<Route path={`${match.path}/:userKey`} component={UserDetailPage} />
		</Switch>
	</div>
);
