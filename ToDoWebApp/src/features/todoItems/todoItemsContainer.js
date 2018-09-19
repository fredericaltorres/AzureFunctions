import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import TodoItems from "./todoItems";

const mapStateToProps = (globalState) => {
	let todoItems = globalState.entity && globalState.entity.todo && globalState.entity.todo.items;
	if(!todoItems)
		todoItems = [];
	const r = {
		todoItems,
	};
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

export default connect(mapStateToProps)(TodoItems);
