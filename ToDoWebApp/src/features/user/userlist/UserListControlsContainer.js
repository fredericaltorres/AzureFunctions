import { connect } from "@emoney/redux-utils";
import { selectRequestByActionTypeHelper } from "common/requestSelectors";

import { selectUserSortKey } from "features/user/userSelectors";
import { setUserSortKeyAction } from "features/user/userActions";
import { fetchUsersAsyncAction } from "entities/user/userActions";
import UserListControls from "./UserListControls";

const mapStateToProps = globalState => {
	const request = selectRequestByActionTypeHelper(globalState, fetchUsersAsyncAction.type);
	return {
		userSortKey: selectUserSortKey(globalState),
		isLoadingUsers: request.processing
	};
};

const mapDispatchToProps = {
	loadAdditionalUsers: fetchUsersAsyncAction,
	setUserSortKey: setUserSortKeyAction
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserListControls);
