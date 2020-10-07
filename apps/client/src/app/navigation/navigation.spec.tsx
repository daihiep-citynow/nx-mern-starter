import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import Navigation from './navigation';
import { BrowserRouter } from 'react-router-dom';

describe('Navigation', () => {
	let el: RenderResult;

	beforeEach(() => {
		el = render(
			<BrowserRouter>
				<Navigation />
			</BrowserRouter>,
		);
	});
	it('should render successfully', () => {
		expect(el.baseElement).toBeTruthy();
	});
});
