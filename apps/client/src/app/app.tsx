import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './app.routes';
import Navigation from './navigation/navigation';

export const App = () => (
	<BrowserRouter>
		<Navigation />
		<main style={{ marginTop: 75 }}>
			<AppRoutes />
		</main>
	</BrowserRouter>
);

export default App;
