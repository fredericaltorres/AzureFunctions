import { combineReducers } from "redux";

import userReducer from "features/user/userReducer";
import { prefix as userPrefix } from "features/user/userConstants";

export default combineReducers({
	[userPrefix]: userReducer
});
