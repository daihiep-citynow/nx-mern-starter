import React, { Component } from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormGroup,
	Input,
	InputLabel,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { TodoFormProps, TodoFormState } from '../todos.interfaces';
import { bindThis } from '../../utils/object.utils';
import moment from 'moment';
import update from 'immutability-helper';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import { TodoDto } from '@nx-mern-starter/interfaces';

export class TodoForm extends Component<TodoFormProps, TodoFormState> {
	get date() {
		return moment().format('MM/DD/yyyy');
	}

	get formIsValid() {
		const form = this.state.formValue;
		return (
			form.title &&
			form.title.length &&
			form.due &&
			form.due.toString().length
		);
	}

	constructor(props) {
		super(props);
		this.state = {
			formValue: {
				title: '',
				description: '',
				due: this.date,
				done: false,
			},
		};
		bindThis(TodoForm, this);
	}

	componentDidMount() {
		if (this.props.todo) {
			const todo = this.props.todo;
			this.setState({
				formValue: {
					title: todo.title,
					description: todo.description,
					due: moment(todo.due).format('MM/DD/yyyy'),
					done: todo.done,
				},
			});
		}
	}

	render() {
		return (
			<Dialog
				onClose={this.handleClose}
				open={this.props.open}
				fullWidth={true}
			>
				<DialogTitle>
					{this.props.todo ? 'Edit' : 'Add A'} Todo
				</DialogTitle>
				<DialogContent>
					<FormGroup>
						<FormControl margin={'normal'}>
							<InputLabel htmlFor="title">Title</InputLabel>
							<Input
								required={true}
								value={this.state.formValue.title}
								onChange={this.handleChange}
								autoFocus
								id="title"
								type="text"
								fullWidth
							/>
						</FormControl>
						<FormControl margin={'normal'}>
							<InputLabel htmlFor="description">
								Description
							</InputLabel>
							<Input
								value={this.state.formValue.description}
								onChange={this.handleChange}
								id="description"
								type="text"
								fullWidth
							/>
						</FormControl>
						<FormControl margin={'normal'}>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									disableToolbar
									variant="inline"
									format="MM/dd/yyyy"
									margin="normal"
									id="due"
									label="Due"
									value={this.state.formValue.due}
									onChange={this.handleChange}
									KeyboardButtonProps={{
										'aria-label': 'change date',
									}}
								/>
							</MuiPickersUtilsProvider>
						</FormControl>
					</FormGroup>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.handleClose}>Cancel</Button>
					<Button
						disabled={!this.formIsValid}
						onClick={this.handleSubmit}
						color="primary"
					>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		);
	}

	handleChange(event) {
		const isDate = event instanceof Date;
		const input = isDate ? 'due' : event.target.getAttribute('id');
		const $set = isDate ? event : event.target.value;
		const newFormValue = {};
		newFormValue[input] = { $set };
		const formValue = update(this.state.formValue, newFormValue);
		this.setState({ formValue });
	}

	handleSubmit() {
		this.props.todo ? this.editTodo() : this.addTodo();
	}

	async addTodo() {
		const res = await axios.post(
			`${environment.api}/todos`,
			this.state.formValue,
		);
		const data = res.data;
		if (!data.success) {
			return this.props.onClose({
				success: false,
				message: data.message,
			});
		}

		this.props.onClose({
			success: true,
			todo: new TodoDto(res.data.data),
		});
	}

	async editTodo() {
		const res = await axios.put(
			`${environment.api}/todos/${this.props.todo._id}`,
			this.state.formValue,
		);
		const data = res.data;
		if (!data.success) {
			return this.props.onClose({
				success: false,
				message: data.message,
			});
		}

		const todo = new TodoDto(res.data.data);
		todo.due = moment(todo.due).format('MM/DD/yyyy');
		this.props.onClose({
			success: true,
			todo,
		});
	}

	handleClose() {
		this.props.onClose({ success: true });
	}
}

export default TodoForm;
