import { TodosListState, TodosProps } from '../todos.interfaces';
import {
	Checkbox,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@material-ui/core';
import React, { Component } from 'react';
import { TodoDto } from '@nx-mern-starter/interfaces';

export class TodosList extends Component<TodosProps, TodosListState> {
	render() {
		return (
			<div>
				<TableContainer component={Paper}>
					<Table className="table" aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Done</TableCell>
								<TableCell>Title</TableCell>
								<TableCell>Due</TableCell>
								<TableCell />
							</TableRow>
						</TableHead>
						<TableBody>
							{this.props.todos.map((todo) => (
								<TableRow key={todo._id}>
									<TableCell
										className={
											todo.done
												? 'MuiAlert-standardSuccess'
												: todo.isDueShortly() &&
												  !todo.done
												? 'MuiAlert-standardWarning'
												: todo.isOverdue() &&
												  !todo.isDueShortly() &&
												  !todo.done
												? 'MuiAlert-standardError'
												: 'MuiAlert-standardInfo'
										}
										component="th"
										scope="row"
									>
										<Checkbox
											checked={todo.done}
											onChange={this.toggleDone(todo)}
										/>
									</TableCell>
									<TableCell
										component="th"
										scope="row"
										style={{
											textDecoration: todo.done
												? 'line-through'
												: 'none',
										}}
									>
										{todo.title}
										{todo.isOverdue() &&
											!todo.isDueShortly() &&
											!todo.done &&
											' (overdue)'}
									</TableCell>
									<TableCell component="th" scope="row">
										{todo.due}
									</TableCell>
									<TableCell component="th" scope="row">
										edit view delete
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		);
	}

	delete(todo: TodoDto) {
		return null;
	}

	edit(todo: TodoDto) {
		return null;
	}

	toggleDone(todo: TodoDto) {
		return null;
	}

	view(todo: TodoDto) {
		return null;
	}
}

export default TodosList;
