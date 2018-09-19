import { createAsyncAction } from "@emoney/redux-utils";
// import { createAction } from 'redux-actions';
import TodoService from './todoService';

const TODO_FETCH = 'TODO_FETCH';
const createToDoFetchAsyncActionProcessor = async (dispatch, getState) => {	
	return TodoService.getItem();
};
export const createToDoFetchAsyncAction = createAsyncAction(
	TODO_FETCH,
	createToDoFetchAsyncActionProcessor
);

const TODO_MARK_AS_COMPLETED = 'TODO_MARK_AS_COMPLETED';
const createToDoMarkAsCompletedAsyncActionProcessor = async (dispatch, getState, todoItem) => {	
	return TodoService.updateItem(todoItem);
};
export const createToDoMarkAsCompletedAsyncAction = createAsyncAction(
	TODO_MARK_AS_COMPLETED,
	createToDoMarkAsCompletedAsyncActionProcessor
);
