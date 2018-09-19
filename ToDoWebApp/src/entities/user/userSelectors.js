import { localizer } from "@emoney/redux-utils";
import { createSelector } from "reselect";
import { prefixPath } from "./userConstants";

export const selectUserHashLocal = localState => localState.userHash;

export const selectUserHash = localizer(selectUserHashLocal, prefixPath);

export const selectUsers = createSelector(
	selectUserHash,
	userHash => (userHash ? Object.values(userHash) : userHash)
);
