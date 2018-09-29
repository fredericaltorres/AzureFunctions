import { selectRequestsArray, convertRequestToStatusObject } from "@emoney/redux-utils";

export const selectRequestsByResourceKeyHelper = (globalState, resourceKey) =>
	selectRequestsArray(globalState).filter(request => request.resourceKey === resourceKey);

export const selectRequestByActionTypeHelper = (globalState, type) => {
	const requests = selectRequestsArray(globalState).filter(request => request.type === type);

	const result = requests ? requests[requests.length - 1] : null;
	return convertRequestToStatusObject(result);
};
