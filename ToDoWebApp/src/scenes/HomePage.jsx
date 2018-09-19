import React from "react";

import CounterPanelContainer from "features/counter/CounterPanelContainer";
import TodoItemsContainer from "features/todoItems/todoItemsContainer";

export default () => (
	<div>
		<h1>Home</h1>
		<CounterPanelContainer />
		<TodoItemsContainer/>
	</div>
);
