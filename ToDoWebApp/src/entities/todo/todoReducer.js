import { handleActions } from "redux-actions";
import {
	createToDoFetchAsyncAction
} from "./todoActionCreator";

const initialState = {
	isLoading : false,
	items : []
};

export default handleActions(
	{
		[createToDoFetchAsyncAction.start]: (localState) => ({
			...localState,
			isLoading : true,
		}),
		[createToDoFetchAsyncAction.success]: (localState, action) => {
			const r = {
				...localState,
				items : action.payload.data
			};
			console.log(`todo items received ${r.items.length}`);
			return r;
		},
		[createToDoFetchAsyncAction.failure]: (localState, action) => ({
			...localState,
		}),
		[createToDoFetchAsyncAction.complete]: (localState, action) => ({
			...localState,
			isLoading : false,
		}),
	},
	initialState
);
