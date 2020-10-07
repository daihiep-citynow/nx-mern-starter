import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import Home from './home';

describe('Home', () => {
	let el: RenderResult;

	beforeEach(() => {
		el = render(<Home />);
	});
	it('should render successfully', () => {
		expect(el.baseElement).toBeTruthy();
	});

	it('should have an SEO-friendly H1 title', async () => {
		const txt = await el.findAllByTitle(
			'Notice Everything Creative | Business Software Solutions',
		);
		expect(txt).toBeTruthy();
	});
});
