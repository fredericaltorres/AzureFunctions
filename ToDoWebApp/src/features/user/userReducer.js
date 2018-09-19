import { handleActions } from "redux-actions";
import { setUserSortKeyAction } from "./userActions";

const initialState = {
	userSortKey: null
};

export default handleActions(
	{
		[setUserSortKeyAction]: (localState, { payload }) => ({
			...localState,
			userSortKey: payload
		})
	},
	initialState
);
