import _ from "lodash";
import { fetchUsers } from "./userGateway";
import { USER_KEY_ATTRIBUTE } from "./userConstants";
import appConstants from "common/appConstants";

const transformApiResponse = response =>
	_.get(response, "data.results").map(user => ({
		...user,
		displayName: `${user.name.first} ${user.name.last}`,
		[appConstants.keyAttribute]: _.get(user, USER_KEY_ATTRIBUTE)
	}));

export const fetchUsersProcessor = (dispatch, getState) =>
	fetchUsers({ params: { results: 5, nat: "us" } }).then(response =>
		transformApiResponse(response)
	);
