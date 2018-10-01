import { createStore, applyMiddleware, compose } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";
import rootReducer from "app/rootReducer";
import { createToDoFetchAsyncAction } from "../entities/todo/todoActionCreator";

import tracer from "../common/Tracer";

import actionTracerMiddleware from "../middleware/actionTracerMiddleware";

export const history = createHistory();

const initialState 	= {};
const enhancers 	= [];
const middleware 	= [thunk, routerMiddleware(history), actionTracerMiddleware];

tracer.log(`Store Init - NODE_ENV:${process.env.NODE_ENV }`);

if (process.env.NODE_ENV === "development") {

	const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
	if (typeof devToolsExtension === "function") {
		enhancers.push(devToolsExtension());
	}
}

const composedEnhancers = compose(
	applyMiddleware(...middleware),
	...enhancers
);

const store = createStore(connectRouter(history)(rootReducer), initialState, composedEnhancers);

console.log(`Loading data . . .`);
store.dispatch(createToDoFetchAsyncAction()).then((response) => {
 	console.log(`Done`);
 });

export default store;
