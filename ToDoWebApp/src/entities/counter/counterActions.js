import { createAction } from "redux-actions";
import { createAsyncAction } from "@emoney/redux-utils";
import { prefix } from "./counterConstants";
import { incrementProcessor, decrementProcessor } from "./counterProcessors";

export const INCREMENT_ACTION_TYPE = `${prefix}/INCREMENT`;
export const DECREMENT_ACTION_TYPE = `${prefix}/DECREMENT`;
export const INCREMENT_ASYNC_ACTION_TYPE = `${prefix}/INCREMENT_ASYNC`;
export const DECREMENT_ASYNC_ACTION_TYPE = `${prefix}/DECREMENT_ASYNC`;

export const incrementAction = createAction(INCREMENT_ACTION_TYPE);

export const decrementAction = createAction(DECREMENT_ACTION_TYPE);

export const incrementAsyncAction = createAsyncAction(
	INCREMENT_ASYNC_ACTION_TYPE,
	incrementProcessor
);
export const decrementAsyncAction = createAsyncAction(
	DECREMENT_ASYNC_ACTION_TYPE,
	decrementProcessor
);
