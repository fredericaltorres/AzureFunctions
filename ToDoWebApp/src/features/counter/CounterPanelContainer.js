import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
	selectCount,
	selectIsIncrementing,
	selectIsDecrementing
} from "entities/counter/counterSelectors";
import {
	incrementAction,
	incrementAsyncAction,
	decrementAction,
	decrementAsyncAction
} from "entities/counter/counterActions";
import CounterPanel from "./CounterPanel";

const mapStateToProps = globalState => ({
	count: selectCount(globalState),
	isIncrementing: selectIsIncrementing(globalState),
	isDecrementing: selectIsDecrementing(globalState)
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			increment: () => incrementAction(),
			incrementAsync: () => incrementAsyncAction(),
			decrement: () => decrementAction(),
			decrementAsync: () => decrementAsyncAction(),
			changePage: () => push("/about-us")
		},
		dispatch
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CounterPanel);
