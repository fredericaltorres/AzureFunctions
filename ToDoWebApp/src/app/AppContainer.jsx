import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "app/store";
import App from "features/app/App";

import {createToDoFetchAsyncAction} from '../entities/todo/todoActionCreator';

class AppContainer extends React.PureComponent {

	// constructor() {
	// 	super();
	// 	store.dispatch(createToDoFetchAsyncAction());
	// }
	render () {
		return (<Provider store={store}>
			<ConnectedRouter history={history}>
				<div>
					<App />
				</div>
			</ConnectedRouter>
		</Provider>);
	}
}

export default AppContainer;