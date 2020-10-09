import React, { Component } from 'react';
import { TodoFormResponse, TodosProps, TodosState } from './todos.interfaces';
import './todos.scss';
import { environment } from '../../environments/environment';
import { Button, CircularProgress, Container } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import TodosList from './todos-list/todos-list';
import { TodoForm } from './todo-form/todo-form';
import { bindThis } from '../utils/object.utils';
import axios from 'axios';
import { TodoDto } from '@nx-mern-starter/interfaces';
import moment from 'moment';
import update from 'immutability-helper';

export class Todos extends Component<TodosProps, TodosState> {
	constructor(props: TodosProps) {
		super(props);
		this.state = { todos: [], working: true, showTodoForm: false };
		bindThis(Todos, this);
	}

	/**
	 * Fetch todos and set state on mount
	 */
	async componentDidMount() {
		const res = await axios.get(`${environment.api}/todos`);
		const todos = res.data.data.map((t) => {
			const todo = new TodoDto(t);
			todo.due = moment(todo.due).format('L');
			return todo;
		});
		this.setState({ todos, working: false });
	}

	render() {
		const addTodoBtn = (
			<Button
				variant="contained"
				size="small"
				onClick={this.showTodoForm}
			>
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
				<br />
				<br />
				<TodosList
					onToggleDone={this.toggleDone}
					onEdit={this.showAndFillTodoForm}
					onDelete={this.delete}
					todos={this.state.todos}
				/>
			</div>
		);

		return (
			<Container id="todos">
				{this.state.working ? (
					<CircularProgress
						size={100}
						style={{ margin: '20px auto', display: 'block' }}
					/>
				) : this.state.todos.length ? (
					todos
				) : (
					noTodos
				)}
				{this.state.showTodoForm && (
					<TodoForm
						todo={this.state.todo}
						open={this.state.showTodoForm}
						onClose={this.handleClose}
					/>
				)}
			</Container>
		);
	}

	showTodoForm() {
		this.setState({ showTodoForm: true });
	}

	async showAndFillTodoForm(todo: TodoDto) {
		this.setState({ showTodoForm: true, todo });
	}

	async delete(todo: TodoDto) {
		axios
			.delete(`${environment.api}/todos/${todo._id}`)
			.then((res) => {
				if (res.data.success) {
					const todos = this.state.todos;
					const i = todos.findIndex((t) => t._id === todo._id);
					todos.splice(i, 1);
					this.setState({ todos });
				} else {
					// TODO
					console.error('ERR: ', res.data.message);
				}
			})
			.catch((e) => {
				// TODO
				console.error('ERR: ', e.message);
			});
	}

	addTodo(todo: TodoDto) {
		this.setState({ showTodoForm: false });
		const existingTodos = this.state.todos;
		const todos = update(existingTodos, { $push: [todo] });
		this.setState({ todos });
	}

	editTodo(todo: TodoDto) {
		this.setState({ showTodoForm: false });
		const existingTodos = this.state.todos;
		const i = existingTodos.findIndex((t) => {
			return t._id === todo._id;
		});

		const todos = update(existingTodos, {
			$splice: [[i, 1, todo]],
		});
		this.setState({ todos });
	}

	async toggleDone(todo: TodoDto) {
		todo.done = !todo.done;
		axios.put(`${environment.api}/todos/${todo._id}`, todo).then((res) => {
			const newTodo = res.data.data;
			const existingTodos = this.state.todos;
			const i = existingTodos.findIndex((t) => t._id === newTodo._id);

			const updatedTodo = update(existingTodos[i], {
				done: { $set: newTodo.done },
			});

			const todos = update(existingTodos, {
				$splice: [[i, 1, updatedTodo]],
			});

			this.setState({ todos });
		});
	}

	handleClose(value: TodoFormResponse) {
		this.setState({ showTodoForm: false });

		if (!value.success) {
			// TODO
			console.error('ERR: ', value.message);
		}

		if (value.todo) {
			const isNew = !this.state.todos.find(
				(t) => t._id === value.todo._id,
			);
			isNew ? this.addTodo(value.todo) : this.editTodo(value.todo);
		}
	}
}

export default Todos;
