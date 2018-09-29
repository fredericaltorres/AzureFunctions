import { handleActions } from "redux-actions";
import {
	createToDoFetchAsyncAction,
	createToDoUpdateAsyncAction,
	createToDoDeleteAsyncAction,
	createToDoAddAsyncAction,	
	createToDoMarkAllAsCompletedAsyncAction,
	createToDoMarkAllAsNotCompletedAsyncAction,
	createToDoDeleteAllAsyncAction
} from "./todoActionCreator";

import tracer from '../../common/Tracer';

const initialState = {
	isLoading : false,
	items : []
};

const updateFuncIsLoadingTrue = (localState) => ({
	...localState,
	isLoading: true
});
const updateFuncIsLoadingFalse = (localState) => ({
	...localState,
	isLoading: false
});

const todoItemsSort = (items) => {
	function compare(a,b) {
		if (a.createdTime < b.createdTime) return -1;
		if (a.createdTime > b.createdTime)return 1;
		return 0;
	  }	  
	  items.sort(compare);
	  return items;
}

export default handleActions(
	{
		// FETCH
		[createToDoAddAsyncAction.start]: updateFuncIsLoadingTrue,
		[createToDoFetchAsyncAction.start]: updateFuncIsLoadingTrue,
		[createToDoUpdateAsyncAction.start]: updateFuncIsLoadingTrue,
		[createToDoMarkAllAsCompletedAsyncAction.start]: updateFuncIsLoadingTrue,
		[createToDoMarkAllAsNotCompletedAsyncAction.start]: updateFuncIsLoadingTrue,
		[createToDoDeleteAllAsyncAction.start]: updateFuncIsLoadingTrue,
		[createToDoDeleteAsyncAction.start]: updateFuncIsLoadingTrue,

		[createToDoAddAsyncAction.complete]:updateFuncIsLoadingFalse,
		[createToDoFetchAsyncAction.complete]: updateFuncIsLoadingFalse,
		[createToDoFetchAsyncAction.complete]: updateFuncIsLoadingFalse,
		[createToDoUpdateAsyncAction.complete]: updateFuncIsLoadingFalse,
		[createToDoMarkAllAsCompletedAsyncAction.complete]: updateFuncIsLoadingFalse,
		[createToDoMarkAllAsNotCompletedAsyncAction.complete]: updateFuncIsLoadingFalse,
		[createToDoDeleteAllAsyncAction.complete]: updateFuncIsLoadingFalse,
		[createToDoDeleteAsyncAction.complete]: updateFuncIsLoadingFalse,

		// FETCH
		[createToDoFetchAsyncAction.success]: (localState, action) => {
			const r = {
				...localState,
				items : todoItemsSort(action.payload.data)
			};
			return r;
		},
		[createToDoFetchAsyncAction.failure]: (localState, action) => ({
			...localState,
		}),

		// UPDATE AS COMPLETED
		[createToDoUpdateAsyncAction.success]: (localState, action) => {
			if(action.meta.args.length === 0) {
				tracer.warn(`invalid action in createToDoUpdateAsyncActionProcessor.success`, this);
				const r = { ...localState };
				return r;
			}
			else {
				const updatedToDo = action.meta.args[0];
				const id = updatedToDo.id;
				const x = localState.items.findIndex((e) => e.id === id);
				localState.items[x] = updatedToDo;
				const r = { ...localState, items : localState.items };
				return r;
			}
		},		
		// ADD
		[createToDoAddAsyncAction.success]: (localState, action) => {			
			const newItem = action.payload.data;
			localState.items.push(newItem);
			const r = {
				...localState,
				items : localState.items
			};
			return r;
		},		

		// DELETE
		[createToDoDeleteAsyncAction.success]: (localState, action) => {
			const id = action.meta.args[0].id;
			const newItems = localState.items.filter((e) => !(e.id === id) );
			const r = {
				...localState,
				items : newItems
			};
			return r;
		},
	},
	initialState
);
