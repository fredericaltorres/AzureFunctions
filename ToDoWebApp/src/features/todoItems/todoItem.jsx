import React from "react";
import PropTypes from "prop-types";
import tracer from '../../common/Tracer';
import store from '../../app/store';
import {createToDoMarkAsCompletedAsyncAction} from '../../entities/todo/todoActionCreator'


class TodoItem extends React.PureComponent {
	static propTypes = {		
		taskDescription : PropTypes.string,
		id : PropTypes.string,
		isCompleted : PropTypes.bool,
	};
	onDeleteClick = () => {
		tracer.log(`todo DELETE id:${this.props.id}`);
	}
	onCheckClick = (e) => {
		const checked = e.target.checked;	
		tracer.log(`todo checked:${checked}, id:${this.props.id}`);
		const newTodo = {
			id : this.props.id,
			isCompleted : checked,
		};
		store.dispatch(createToDoMarkAsCompletedAsyncAction(newTodo));
	}
	render() {
		return (
			<li key={this.props.id} id={this.props.id}>
				completed:<input defaultChecked={this.props.isCompleted} type="checkbox" id={this.props.id} onClick={(e) => { this.onCheckClick(e); }} />
				<button onClick={this.onDeleteClick}>Delete</button>&nbsp;
				{this.props.taskDescription}
			</li>
		);
	}	
}

export default TodoItem;
