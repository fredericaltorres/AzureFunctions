import { combineReducers } from "redux";
import { requestTracking } from "@emoney/redux-utils";

import appConstants from "common/appConstants";

import entityReducer from "entities/entityReducer";
// import featureReducer from "features/featureReducer";

export default combineReducers({
	requestTracking,
	[appConstants.entityPrefix]: entityReducer,
	// [appConstants.featurePrefix]: featureReducer
});
