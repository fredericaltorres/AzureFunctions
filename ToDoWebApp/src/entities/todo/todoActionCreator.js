import { createAsyncAction } from "@emoney/redux-utils";
import TodoService from './todoService';
import tracer from '../../common/Tracer';


const TODO_FETCH = 'TODO_FETCH';
const createToDoFetchAsyncActionProcessor = async (dispatch, getState) => {	
	return TodoService.getItem();
};
export const createToDoFetchAsyncAction = createAsyncAction(
	TODO_FETCH,
	createToDoFetchAsyncActionProcessor
);


const TODO_DELETE = 'TODO_DELETE';
const createToDoDeleteAsyncActionProcessor = async (dispatch, getState, todoItem) => {	
	return TodoService.deleteItem(todoItem);
};
export const createToDoDeleteAsyncAction = createAsyncAction(
	TODO_DELETE,
	createToDoDeleteAsyncActionProcessor
);


const TODO_ADD = 'TODO_ADD';
const createToDoAddAsyncActionProcessor = async (dispatch, getState, todoItem) => {	
	return TodoService.addItem(todoItem);
};
export const createToDoAddAsyncAction = createAsyncAction(
	TODO_ADD,
	createToDoAddAsyncActionProcessor
);


const TODO_UPDATE = 'TODO_UPDATE';
const createToDoUpdateAsyncActionProcessor = async (dispatch, getState, todoItem) => {	
	return TodoService.updateItem(todoItem);
};
export const createToDoUpdateAsyncAction = createAsyncAction(
	TODO_UPDATE,
	createToDoUpdateAsyncActionProcessor
);

const getPromiseToExecuteActionOnAllToDo = async (dispatch, getState, action, updateToDoBeforeDispatchingFunc) => {

	const p = new Promise((resolve, reject) => {

		const state    = getState();
		const promises = [];
		state.entity.todo.items.forEach((item) => {
			if(updateToDoBeforeDispatchingFunc) 
				updateToDoBeforeDispatchingFunc(item);
			promises.push(dispatch(action(item)));
		});
		tracer.log(`Waiting for all http calls to execute...`);
		Promise.all(promises).then(() => { 
			tracer.log(`Done waiting`);
			resolve();
		});
	});
	return p;
}


const TODO_DELETE_ALL = 'TODO_DELETE_ALL';
const createToDoDeleteAllAsyncActionProcessor = async (dispatch, getState) => {	
	return getPromiseToExecuteActionOnAllToDo(dispatch, getState, createToDoDeleteAsyncAction);
};
export const createToDoDeleteAllAsyncAction = createAsyncAction(
	TODO_DELETE_ALL,
	createToDoDeleteAllAsyncActionProcessor
);


const TODO_MARK_ALL_AS_COMPLETED = 'TODO_MARK_ALL_AS_COMPLETED';
const createToDoMarkAllAsCompletedAsyncActionProcessor = async (dispatch, getState) => {	

	const updateToDo = (item) => {
		item.isCompleted = true;
	};
	return getPromiseToExecuteActionOnAllToDo(dispatch, getState, createToDoUpdateAsyncAction, updateToDo);
};
export const createToDoMarkAllAsCompletedAsyncAction = createAsyncAction(
	TODO_MARK_ALL_AS_COMPLETED,
	createToDoMarkAllAsCompletedAsyncActionProcessor
);


const TODO_MARK_ALL_AS_NOT_COMPLETED = 'TODO_MARK_ALL_AS_NOT_COMPLETED';
const createToDoMarkAllAsNotCompletedAsyncActionProcessor = async (dispatch, getState) => {	

	const updateToDo = (item) => {
		item.isCompleted = false;
	};
	return getPromiseToExecuteActionOnAllToDo(dispatch, getState, createToDoUpdateAsyncAction, updateToDo);
};
export const createToDoMarkAllAsNotCompletedAsyncAction = createAsyncAction(
	TODO_MARK_ALL_AS_NOT_COMPLETED,
	createToDoMarkAllAsNotCompletedAsyncActionProcessor
);