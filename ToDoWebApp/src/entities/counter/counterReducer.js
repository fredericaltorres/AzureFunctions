import { handleActions } from "redux-actions";
import {
	incrementAction,
	decrementAction,
	incrementAsyncAction,
	decrementAsyncAction
} from "./counterActions";

import { selectCountLocal } from "./counterSelectors";

const initialState = {
	count: 0,
	isIncrementing: false,
	isDecrementing: false
};

export default handleActions(
	{
		[incrementAction]: localState => ({
			...localState,
			count: selectCountLocal(localState) + 1,
			isIncrementing: true
		}),
		[incrementAsyncAction.start]: localState => ({
			...localState,
			isIncrementing: true
		}),
		[incrementAsyncAction.success]: localState => ({
			...localState,
			count: selectCountLocal(localState) + 1
		}),
		[incrementAsyncAction.failure]: localState => ({
			...localState
			// do something to handle an error
		}),
		[incrementAsyncAction.complete]: localState => ({
			...localState,
			isIncrementing: false
		}),
		[decrementAction]: localState => ({
			...localState,
			count: selectCountLocal(localState) - 1,
			isDecrementing: false
		}),
		[decrementAsyncAction.start]: localState => ({
			...localState,
			isDecrementing: true
		}),
		[decrementAsyncAction.success]: localState => ({
			...localState,
			count: selectCountLocal(localState) - 1
		}),
		[decrementAsyncAction.failure]: localState => ({
			...localState
			// do something to handle an error
		}),
		[decrementAsyncAction.complete]: localState => ({
			...localState,
			isDecrementing: false
		})
	},
	initialState
);
