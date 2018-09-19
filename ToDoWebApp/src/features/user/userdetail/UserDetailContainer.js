import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { selectUserForDetailPage } from "features/user/userSelectors";
import { fetchUsersAsyncAction } from "entities/user/userActions";
import UserDetail from "./UserDetail";

const mapStateToProps = globalState => ({
	user: selectUserForDetailPage(globalState)
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			loader: fetchUsersAsyncAction
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserDetail);
