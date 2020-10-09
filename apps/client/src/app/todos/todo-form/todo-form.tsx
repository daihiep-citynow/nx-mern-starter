import React, { Component } from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	FormGroup,
	Input,
	InputLabel,
} from '@material-ui/core';
import { TodoFormProps, TodoFormState } from '../todos.interfaces';
import { bindThis } from '../../utils/object.utils';
import moment from 'moment';

export class TodoForm extends Component<TodoFormProps, TodoFormState> {
	get date() {
		return moment().format('yyyy-MM-DD');
	}

	get formIsValid() {
		const form = this.state.formValue;
		return form.title && form.title.length && form.due;
	}

	constructor(props) {
		super(props);
		this.state = {
			formValue: {
				title: '',
				description: '',
				due: null,
				done: false,
			},
		};
		bindThis(TodoForm, this, ['formIsValid', 'date']);
	}

	render() {
		return (
			<Dialog
				onClose={this.handleClose}
				open={this.props.open}
				fullWidth={true}
			>
				<DialogTitle>Add A Todo</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<FormGroup>
							<FormControl margin={'normal'}>
								<InputLabel shrink={true} htmlFor="title">
									Title
								</InputLabel>
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
								<InputLabel shrink={true} htmlFor="description">
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
								<InputLabel shrink={true} htmlFor="due">
									Due
								</InputLabel>
								<Input
									required={true}
									value={this.state.formValue.due}
									onChange={this.handleChange}
									id="due"
									type="date"
									defaultValue={this.date}
									fullWidth
								/>
							</FormControl>
						</FormGroup>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.handleClose}>Cancel</Button>
					<Button
						disabled={!this.formIsValid}
						onClick={this.handleClose}
						color="primary"
					>
						Add
					</Button>
				</DialogActions>
			</Dialog>
		);
	}

	handleChange(event) {
		const input = event.target.getAttribute('id');
		const state = { formValue: {} };
		state[input] = event.target.value;
		this.setState(state);
	}

	handleClose() {
		this.props.onClose(this.state.formValue);
	}
}

export default TodoForm;
