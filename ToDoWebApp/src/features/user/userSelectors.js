import _ from "lodash";
import { localizer } from "@emoney/redux-utils";
import { createMatchSelector } from "connected-react-router";
import { createSelector } from "reselect";
import { selectUserHash, selectUsers } from "entities/user/userSelectors";
import { prefixPath } from "./userConstants";
import { userSorter } from "./userUtils";

const selectUserDetailMatch = createMatchSelector({ path: "/users/:userKey" });

export const selectUserSortKeyLocal = localState => localState.userSortKey;

export const selectUserSortKey = localizer(selectUserSortKeyLocal, prefixPath);

export const selectSortedUsers = createSelector(selectUsers, selectUserSortKey, userSorter);

export const selectUserForDetailPage = createSelector(
	selectUserHash,
	selectUserDetailMatch,
	(hash, match) => _.get(hash, _.get(match, "params.userKey"), null)
);
