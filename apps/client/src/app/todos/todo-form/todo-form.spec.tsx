import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import TodoForm from './todo-form';
import { TodoDto } from '@nx-mern-starter/interfaces';

describe('TodoForm', () => {
	let el: RenderResult;

	beforeEach(() => {
		el = render(
			<TodoForm
				todo={new TodoDto({} as any)}
				open={true}
				onClose={() => null}
			/>,
		);
	});

	it('should render successfully', () => {
		expect(el.baseElement).toBeTruthy();
	});
});
