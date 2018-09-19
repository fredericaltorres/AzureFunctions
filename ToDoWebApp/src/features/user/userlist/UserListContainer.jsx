import { connect } from "@emoney/redux-utils";
import { selectRequestByActionTypeHelper } from "common/requestSelectors";

import { selectSortedUsers } from "features/user/userSelectors";
import { fetchUsersAsyncAction } from "entities/user/userActions";
import UserList from "./UserList";

const mapStateToProps = globalState => {
	const request = selectRequestByActionTypeHelper(globalState, fetchUsersAsyncAction.type);
	const users = selectSortedUsers(globalState);
	return {
		users,
		isLoading: !users && request.processing
	};
};

const mapDispatchToProps = {
	loader: fetchUsersAsyncAction
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserList);
