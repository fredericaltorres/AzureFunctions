import todoReducer from '../todoReducer';
import { 
	createToDoAddAsyncAction,
	createToDoFetchAsyncAction,
	createToDoMarkAllAsCompletedAsyncAction,
	createToDoMarkAllAsNotCompletedAsyncAction,
	createToDoDeleteAllAsyncAction,
	createToDoDeleteAsyncAction,
	createToDoUpdateAsyncAction
} from '../todoActionCreator';
 
const expectedTodo1 = { id:1, isCompleted: false, taskDescription: 'bla bla 1' };
const expectedTodo2 = { id:2, isCompleted: false, taskDescription: 'bla bla 2' };
const todoItemsArray = [expectedTodo1, expectedTodo2];

describe('todoReducer', () => {

	const initialLocalState = {
		isLoading: false
	};

	[
		createToDoAddAsyncAction,
		createToDoFetchAsyncAction,
		createToDoMarkAllAsCompletedAsyncAction,
		createToDoMarkAllAsNotCompletedAsyncAction,
		createToDoDeleteAllAsyncAction,
		createToDoDeleteAsyncAction,
	].forEach((action) => {

		it(`it should respond action.start`, () => {
			const startedAction = { type: action.start };
			const localStateInput = { ...initialLocalState };
			const result = todoReducer(localStateInput, startedAction);
			expect(result.isLoading).toEqual(true);
		});
		it(`it should respond action.complete`, () => {
			const startedAction = { type: action.complete };
			const localStateInput = { ...initialLocalState, isLoading: true };
			const result = todoReducer(localStateInput, startedAction);
			expect(result.isLoading).toEqual(false);
		});
	});

	it(`it should respond to action createToDoFetchAsyncAction.success`, () => {
		const startedAction = { 
			type: createToDoFetchAsyncAction.success,
			payload : {
				data : todoItemsArray
			}
		};
		const localStateInput = { ...initialLocalState, isLoading: true };
		const result = todoReducer(localStateInput, startedAction);
		expect(result.items).toEqual(todoItemsArray);
		expect(result.isLoading).toEqual(true);
	});

	it(`it should respond to action createToDoAddAsyncAction.success`, () => {
		const startedAction = { 
			type: createToDoAddAsyncAction.success,
			payload : { data: expectedTodo2 },
		};
		const localStateInput = { 
			...initialLocalState, 
			items : [expectedTodo1],
			isLoading: true 
		};
		const result = todoReducer(localStateInput, startedAction);
		expect(result.items.length).toEqual(2);
		expect(result.items).toEqual(todoItemsArray);
		expect(result.isLoading).toEqual(true);
	});
	
	it(`it should respond to action createToDoDeleteAsyncAction.success`, () => {

		const startedAction = { 
			type: createToDoDeleteAsyncAction.success,
			meta: {  args: [ { id: expectedTodo1.id } ] }
		};
		const localStateInput = { 
			...initialLocalState, 
			items : todoItemsArray,
			isLoading: true
		};
		const result = todoReducer(localStateInput, startedAction);		
		expect(result.items).toEqual([expectedTodo2]);
		expect(result.isLoading).toEqual(true);
	});

	it(`it should respond to action createToDoUpdateAsyncAction.success`, () => {

		const taskDescription = 'new value';
		const startedAction = { 
			type: createToDoUpdateAsyncAction.success,
			meta: {  args: [ { ...expectedTodo2, taskDescription } ] }
		};
		const localStateInput = { 
			...initialLocalState, 
			items : todoItemsArray,
			isLoading: true
		};
		const result = todoReducer(localStateInput, startedAction);		
		expect(result.items.length).toEqual(2);
		expect(result.items[1].taskDescription).toEqual(taskDescription);
	});
});
