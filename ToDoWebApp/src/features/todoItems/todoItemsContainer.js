// import { push } from "connected-react-router";
// import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import TodoItems from "./todoItems";
import { selectToDoItems } from '../../entities/todo/todoSelectors';
import {
	createToDoAddAsyncAction,
	createToDoMarkAllAsCompletedAsyncAction,
	createToDoMarkAllAsNotCompletedAsyncAction,
	createToDoDeleteAllAsyncAction
} from '../../entities/todo/todoActionCreator'

const mapStateToProps = (globalState) => {

	// NEED SELECTOR
	let todoItems = selectToDoItems(globalState);
	// NEED SELECTOR
	let isLoading = globalState.entity && globalState.entity.todo && globalState.entity.todo.isLoading;

	isLoading ? true : false;
	if(!todoItems)
		todoItems = [];
	const r = {
		todoItems,
		isLoading
	};
	// console.log(`mapStateToProps ${JSON.stringify(r)}`);
	return r;
}

// const mapDispatchToProps = dispatch =>
// 	bindActionCreators(
// 		{
// 			increment: () => incrementAction(),
// 			incrementAsync: () => incrementAsyncAction(),
// 			decrement: () => decrementAction(),
// 			decrementAsync: () => decrementAsyncAction(),
// 			changePage: () => push("/about-us")
// 		},
// 		dispatch
// 	);

const mapDispatchToProps = (dispatch) => ({
	
	addNewToDo : (taskDescription) => {
		const newTodo = { taskDescription };
		return dispatch(createToDoAddAsyncAction(newTodo));
	},
	markAllAsCompleted : () => {
		return dispatch(createToDoMarkAllAsCompletedAsyncAction());		
	},
	markAllAsNotCompleted : () => {
		return dispatch(createToDoMarkAllAsNotCompletedAsyncAction());
	},
	deletAll : () => {
		return dispatch(createToDoDeleteAllAsyncAction());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoItems);
