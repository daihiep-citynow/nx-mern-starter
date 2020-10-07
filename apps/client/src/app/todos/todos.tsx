import React, { Component } from 'react';
import TodosHtml from './todos.html';
import { TodosProps } from './todos.interfaces';
import './todos.scss';

export class Todos extends Component<TodosProps> {
	render() {
		return <TodosHtml />;
	}
}

export default Todos;
