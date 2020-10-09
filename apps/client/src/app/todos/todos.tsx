import React, { Component } from 'react';
import { TodosProps, TodosState } from './todos.interfaces';
import './todos.scss';
import { environment } from '../../environments/environment';
import { Button, CircularProgress, Container } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import TodosList from './todos-list/todos-list';
import { TodoForm } from './todo-form/todo-form';
import { bindThis } from '../utils/object.utils';
import axios from 'axios';

export class Todos extends Component<TodosProps, TodosState> {
	constructor(props: TodosProps) {
		super(props);
		this.state = { todos: [], working: true, showAddDialog: false };
		bindThis(Todos, this);
	}

	/**
	 * Fetch todos and set state on mount
	 */
	async componentDidMount() {
		const res = await axios.get(`${environment.api}/todos`);
		const todos = res.data;
		this.setState({ todos, working: false });
	}

	render() {
		const addTodoBtn = (
			<Button variant="contained" size="small" onClick={this.addTodo}>
				add one
			</Button>
		);

		const noTodos = (
			<Alert severity="warning">
				&nbsp; No TODOS found :(
				<br />
				{addTodoBtn}
			</Alert>
		);

		const todos = this.state.todos.length && (
			<div style={{ textAlign: 'center' }}>
				<h1>Todos</h1>
				{addTodoBtn}
				<TodosList todos={this.state.todos} />
			</div>
		);

		return (
			<Container id="todos">
				{this.state.working ? (
					<CircularProgress />
				) : this.state.todos.length ? (
					todos
				) : (
					noTodos
				)}
				<TodoForm
					open={this.state.showAddDialog}
					onClose={this.handleClose}
				/>
			</Container>
		);
	}

	addTodo() {
		this.setState({ showAddDialog: true });
	}

	handleClose(value) {
		console.log('VAL: ', value);
		this.setState({ showAddDialog: false });
	}
}

export default Todos;
