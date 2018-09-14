import React from "react";
import { connect } from "react-redux";
import * as counterActions from "./counterActions";
import * as counterSelector from './counterSelector';
import store from '../store';

export const CounterPlainComponent = props => {
	const { counter, increment, decrement } = props;
	console.log(`Component Counter.render()`);
	return (
		<div style={{ margin: "40px" }}>
			<span style={{ marginRight: "20px" }}>Value: {counter}</span>
			<button onClick={increment}>+</button>
			<button onClick={decrement}>-</button>
		</div>
	);
};


const defaultState = { counter: { value : 0 } };

export const mapStateToProps = function(state = defaultState) {
	const a = {
		counter: counterSelector.counterGetCounterSelector(state)
	};
	console.log(`Component Counter.mapStateToProps() state:${JSON.stringify(state)}, return:${JSON.stringify(a)}`);
	return a;
}

const mapDispatchToProps = {
    increment: counterActions.incrementAction,
    decrement: counterActions.decrementAction
};

console.log(`Component Counter connect, connector`);

const connector = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = connector(CounterPlainComponent);
export default connectedComponent;
