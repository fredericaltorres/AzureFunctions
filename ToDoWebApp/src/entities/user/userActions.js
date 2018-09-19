import { createAsyncAction } from "@emoney/redux-utils";
import { FETCH_USERS_ASYNC_ACTION_TYPE } from "./userConstants";
import { fetchUsersProcessor } from "./userProcessors";

export const fetchUsersAsyncAction = createAsyncAction(
	FETCH_USERS_ASYNC_ACTION_TYPE,
	fetchUsersProcessor
);
