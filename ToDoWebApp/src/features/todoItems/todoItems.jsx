import React from "react";
import PropTypes from "prop-types";
import TodoItem from './todoItem';
import tracer from '../../common/Tracer';

class TodoItems extends React.PureComponent {
	
	static propTypes = {		
		todoItems : PropTypes.arrayOf(PropTypes.object)
	};
	constructor() {
		super();
		this.name = "TodoItems";
		tracer.log('constructor', this);
	}
	renderToDoItemToJsx(todoItem) {
		tracer.log(`renderToDoItemToJsx ${JSON.stringify(todoItem)}`);
		return <TodoItem 
			taskDescription={todoItem.taskDescription}
			id={todoItem.id}
			isCompleted={todoItem.isCompleted}
			key={todoItem.id}
		/>;
	}
	renderToDoItemsToJsx(todoItems) {
		return todoItems.map((todoItem) => {
			return this.renderToDoItemToJsx(todoItem);
		});
	}
	render() {

		return (
			<section>
				{this.props.todoItems.length} ITEMS
				<hr/>
				{this.renderToDoItemsToJsx(this.props.todoItems)}
			</section>
		);
	}	
}

export default TodoItems;
