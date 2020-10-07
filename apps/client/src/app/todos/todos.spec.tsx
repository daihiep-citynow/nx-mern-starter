import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import Todos from './todos';

describe('Todos', () => {
	let el: RenderResult;

	beforeEach(() => {
		el = render(<Todos />);
	});
	it('should render successfully', () => {
		expect(el.baseElement).toBeTruthy();
	});

	it('should have a greeting as the title', () => {
		const txt = el.getByText('Welcome to todos!');
		expect(txt).toBeTruthy();
	});
});
