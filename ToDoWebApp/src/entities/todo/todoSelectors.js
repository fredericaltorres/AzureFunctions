import { createSelector } from 'reselect';

export const selectToDoItems = createSelector(
	(globalState) => {
		// console.log('selectToDoItems: '+JSON.stringify(globalState));
		return globalState;
	},
	(globalState) => {
		let todoItems = globalState.entity && globalState.entity.todo && globalState.entity.todo.items;
		if(!todoItems)
			todoItems = [];
		return todoItems;
	}
);
