import { TodosListProps, TodosListState } from '../todos.interfaces';
import {
	Button,
	Checkbox,
	Icon,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@material-ui/core';
import React, { Component } from 'react';
import { bindThis } from '../../utils/object.utils';
import moment from 'moment';

export class TodosList extends Component<TodosListProps, TodosListState> {
	constructor(props) {
		super(props);
		bindThis(TodosList, this);
	}

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
								<TableRow
									key={todo._id}
									className={
										todo.done
											? 'success'
											: todo.isDueShortly() && !todo.done
											? 'warning'
											: todo.isOverdue() &&
											  !todo.isDueShortly() &&
											  !todo.done
											? 'error'
											: 'info'
									}
								>
									<TableCell component="th" scope="row">
										<Checkbox
											checked={todo.done}
											onChange={() =>
												this.props.onToggleDone(todo)
											}
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
										{moment(todo.due).format('MM/DD/yyyy')}
									</TableCell>
									<TableCell component="th" scope="row">
										<Button
											size="small"
											onClick={() =>
												this.props.onEdit(todo)
											}
										>
											<Icon>edit</Icon>
										</Button>
										<Button
											size="small"
											onClick={() =>
												this.props.onDelete(todo)
											}
										>
											<Icon>delete</Icon>
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		);
	}
}

export default TodosList;
