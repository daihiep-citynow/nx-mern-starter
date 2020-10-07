import { Route } from 'react-router-dom';
import Todos from './todos/todos';
import React from 'react';
import Home from './home/home';

export const AppRoutes = () => (
	<div>
		<Route component={Home} path="/" exact />
		<Route component={Todos} path="/todos" />
	</div>
);

export default AppRoutes;
