import React from "react";
import PropTypes from "prop-types";
import TodoItem from './todoItem';
import tracer from '../../common/Tracer';
import {
	createToDoAddAsyncAction,
	createToDoMarkAllAsCompletedAsyncAction,
	createToDoMarkAllAsNotCompletedAsyncAction,
	createToDoDeleteAllAsyncAction,
	createToDoFetchAsyncAction
} from '../../entities/todo/todoActionCreator'
import { osName, osVersion, browserName, isMobile  } from 'react-device-detect';
import MqttManager from './mqttManager';

import "./todoItems.css";

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

class TodoItems extends React.PureComponent {
	
	static propTypes = {		
		todoItems : PropTypes.arrayOf(PropTypes.object),
		isLoading: PropTypes.bool.isRequired,
		markAllAsCompleted: PropTypes.func.isRequired,
		markAllAsNotCompleted: PropTypes.func.isRequired,
		deletAll: PropTypes.func.isRequired,
		addNewToDo: PropTypes.func.isRequired,
		reloadToDo: PropTypes.func.isRequired,
	};
	static setShowDateFromDB(showDate) {
		localStorage.setItem('showDate', JSON.stringify(showDate));
		return showDate;
	}
	static getShowDateFromDB() {
		const v = localStorage.getItem('showDate');
		if(v) 
			return JSON.parse(v);
		return false;
	}
	state = {
		timeStamp: new Date().getTime(),
		editText :'',
		showDate : TodoItems.getShowDateFromDB(),
		mqttNewMessage : null
	};
	constructor() {

		super();
		this.name = "TodoItems";
		tracer.log('constructor', this);
	}
	onMqttMessageArrived = (mqttParsedMessage) => {
		this.setState({ ...this.state, mqttNewMessage: mqttParsedMessage });
		this.props.reloadToDo();
    }
	componentDidMount() {
		const mqttUrl       = 'wss://m15.cloudmqtt.com';
		const mqttChannel   = "/todo-update";
		const clientId      = `iotDashboard-${osName}-${osVersion}-${browserName}-` + Math.random().toString(16).substr(2, 8);
		if(!this._mqttManager) {
			this._mqttManager   = new MqttManager(mqttUrl, 'user1', 'user1', undefined, clientId);

			this._mqttManager.start().then((value) => {

				this._mqttManager.subscribe(mqttChannel).then((channel) => {

					this._mqttManager.publish(mqttChannel, `New todo web app instance connected`);
				});
				this._mqttManager.messageArrived = this.onMqttMessageArrived;
			})
			.catch((value) => {
				alert(value);
			});
		}
    }
	forceRefresh = (otherState) => {

		const timeStamp = new Date().getTime();
		let newState = null;
		if(otherState) {
			newState = {
				...this.state,
				...otherState,
				timeStamp
			}
		}
		else {
			newState = {
				...this.state,
				timeStamp
			}
		}		
		// tracer.log(`forceRefresh ${JSON.stringify(newState)}`, this);
		this.setState(newState);
	}
	renderToDoItemToJsx = (todoItem) => {

		let createdTime = todoItem.createdTime;
		if(!this.state.showDate)
			createdTime = null;

		return ( <TodoItem forceRefresh={this.forceRefresh}
			id={todoItem.id} 
			createdTime={createdTime}
			taskDescription={todoItem.taskDescription} 
			isCompleted={todoItem.isCompleted}			
			key={todoItem.id} 
		/> );
	}
	renderToDoItemsToJsx = (todoItems) => {

		return todoItems.map((todoItem) => {

			return this.renderToDoItemToJsx(todoItem);
		});
	}
	getAddButtonAlertJsx = (isLoading, render) => {

		if(!render) {
			return null;
		}
		const message = isLoading ? "Busy . . . " : "Ready . . . ";
		let className = isLoading ? "btn btn-outline-warning" : "btn btn-outline-primary";
		let mqttJsx = null;
		if(this.state.mqttNewMessage !== null) {
			mqttJsx = <span>
				{this.state.mqttNewMessage.message}
			</span>;
		}

		return <div>
			<button disabled={this.props.isLoading} type="button" className="btn btn-primary" onClick={this.handleSubmit}>Add</button> &nbsp;
			<button type="button" className={className}>{message}</button>			
			&nbsp;&nbsp;
			
			<input type="checkbox" style={{transform: 'scale(1.75)'}} 
					checked={this.state.showDate}
					id="chkShowDate" 
					onChange={this.onShowDateCheckboxClick} 
				/> Show Date

			{mqttJsx}
		</div>;
	}
	getTaskDescriptionInputBoxJsx = (isLoading) => {
		return (
			<span>
				<input disabled={isLoading} type="text" className="form-control-sm mb-2 mr-sm-2" 
					ref={(input) => { this.editField = input; }}
					placeholder=" Enter todo description..." className="edit" value={this.state.editText}
					onChange={this.handleChange} onKeyDown={this.handleKeyDown}
				/>
				<button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Add</button>
			</span>
		);
	}
	componentDidUpdate() {

		// Set the cursor to the textbox on any refresh, but not on mobile
		if( this.editField && (!isMobile)) {
			this.editField.focus();
		}
	}
	handleEdit = () => {

		this.props.onEdit();
		this.setState({editText: this.props.todo.title});
	}
	handleKeyDown = (event) => {

		if (event.which === ESCAPE_KEY) 
			this.setState({editText: ''});
		else if (event.which === ENTER_KEY) 
			this.handleSubmit(event);
	}
	handleSubmit = () => {

		var taskDescription = this.state.editText.trim();
		if(taskDescription) {
			this.props.addNewToDo(taskDescription).then(() => {
				this.setState({editText: ''}); // Also trigger a refresh
			});
		}		
	}
	handleChange = (event) => {

		this.setState({editText: event.target.value});
	}
	thenRefresh = (promise) => {

		return promise.then(this.forceRefresh());
	}
	onShowDateCheckboxClick = (e) => {

		const updateState = {
			showDate: TodoItems.setShowDateFromDB(e.target.checked)
		};
		this.forceRefresh(updateState);
		tracer.log('blur')
		this.editField.blur();
	}
	getMenuJsx = () => {
		const menuStyle = { cursor: 'pointer' };
		return (
			<div className="input-group-prepend">
				<button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Options</button>
				<div className="dropdown-menu">
					<a className="dropdown-item" style={menuStyle} onClick={() => { this.thenRefresh(this.props.markAllAsCompleted()); }} >Mark All As Completed</a>
					<a className="dropdown-item" style={menuStyle} onClick={() => { this.thenRefresh(this.props.markAllAsNotCompleted()); }} >Mark All As Not Completed</a>
					<a className="dropdown-item" style={menuStyle} onClick={() => { this.thenRefresh(this.props.deletAll()); }}>Delete All</a>
					<a className="dropdown-item" style={menuStyle} onClick={this.forceRefresh} >Refresh</a>
				</div>
			</div>
		);
	}
	render() {
		tracer.log(`render() timeStamp:${this.state.timeStamp}`, this);
		
		return (
			<section>
				<div className="input-group" style={{marginBottom:'5px'}}>

					{this.getMenuJsx()}
				
					<input disabled={this.props.isLoading} type="text" 
						className="form-control-sm mb-2 mr-sm-2" 
						placeholder=" Enter todo description..." className="edit" 
						value={this.state.editText} 
						onChange={this.props.isLoading ? () => {} : this.handleChange} 
						onKeyDown={this.handleKeyDown}
						ref={(input) => { this.editField = input; }} 
					/> &nbsp;
					{this.getAddButtonAlertJsx(this.props.isLoading, !isMobile)}
				</div>	
				{this.getAddButtonAlertJsx(this.props.isLoading, isMobile)}
				
				<ul className="list-group" style={{marginTop:'5px'}}>
					{this.renderToDoItemsToJsx(this.props.todoItems)}
				</ul>
			</section>
		);
	}
}

export default TodoItems;

