import React from "react";
import PropTypes from "prop-types";

const propTypes = {
	increment: PropTypes.func.isRequired,
	incrementAsync: PropTypes.func.isRequired,
	decrement: PropTypes.func.isRequired,
	decrementAsync: PropTypes.func.isRequired,
	isIncrementing: PropTypes.bool.isRequired,
	isDecrementing: PropTypes.bool.isRequired,
	count: PropTypes.number.isRequired
};

const CounterPanel = ({
	increment,
	incrementAsync,
	decrement,
	decrementAsync,
	isIncrementing,
	isDecrementing,
	count
}) => (
	<section>
		<p>Count: {count}</p>
		<p>
			<button onClick={increment}>Increment</button>
			{/* disabled={isIncrementing}> */}
			<button onClick={incrementAsync} >
				Increment Async
			</button>
		</p>

		<p>
			<button onClick={decrement}>Decrementing</button>
			<button onClick={decrementAsync}>
				Decrement Async
			</button>
		</p>
	</section>
);

CounterPanel.propTypes = propTypes;
export default CounterPanel;
