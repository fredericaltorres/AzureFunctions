import React from "react";
import AppHeader from "./AppHeader";
import AppRoutes from "./AppRoutes";

class App extends React.PureComponent {

	render () {
		return (
			<div>
				<AppHeader />
				<AppRoutes />
			</div>
		);
	}	
}
export default App;
