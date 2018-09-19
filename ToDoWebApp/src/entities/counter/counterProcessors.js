import { selectCount } from "./counterSelectors";

const timeout = 300;
export const incrementProcessor = (dispatch, getState) =>
	new Promise(resolve => {
		console.log("incrementing, current count is", selectCount(getState()));
		setTimeout(() => resolve(), timeout);
	});

export const decrementProcessor = (dispatch, getState) =>
	new Promise(resolve => {
		console.log("decrementing, current count is", selectCount(getState()));
		setTimeout(() => resolve(), timeout);
	});
