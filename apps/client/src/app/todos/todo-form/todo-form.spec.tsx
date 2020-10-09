import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import TodoForm from './todo-form';

describe('TodoForm', () => {
	let el: RenderResult;

	beforeEach(() => {
		el = render(<TodoForm open={true} onClose={() => null} />);
	});

	it('should render successfully', () => {
		expect(el.baseElement).toBeTruthy();
	});
});
