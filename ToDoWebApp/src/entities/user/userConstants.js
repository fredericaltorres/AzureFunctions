import appConstants from "common/appConstants";

export const prefix = "user";
export const prefixPath = `${appConstants.entityPrefix}.${prefix}`;

export const USER_KEY_ATTRIBUTE = "login.uuid";

export const FETCH_USERS_ASYNC_ACTION_TYPE = `${prefix}/FETCH_USERS`;
