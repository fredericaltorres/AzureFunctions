import { handleActions } from "redux-actions";
import { mergePayloadIntoHash } from "@emoney/redux-utils";
import { fetchUsersAsyncAction } from "./userActions";
import { USER_KEY_ATTRIBUTE } from "./userConstants";

import { selectUserHashLocal } from "./userSelectors";

const initialState = {
	// use null to identify things that need to be fetched vs empty sets
	userHash: null
};

export default handleActions(
	{
		[fetchUsersAsyncAction.success]: (localState, { payload }) => ({
			...localState,
			// load any existin data then merge the new data into it
			userHash: mergePayloadIntoHash(selectUserHashLocal(localState), payload, USER_KEY_ATTRIBUTE)
		})
	},
	initialState
);
