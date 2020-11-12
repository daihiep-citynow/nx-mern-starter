import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import TodosList from './todos-list';

describe('TodosList', () => {
	let el: RenderResult;

	beforeEach(() => {
		el = render(
			<TodosList
				onToggleDone={null}
				onDelete={null}
				onEdit={null}
				todos={[]}
			/>,
		);
	});

	it('should render successfully', () => {
		expect(el.baseElement).toBeTruthy();
	});
});
