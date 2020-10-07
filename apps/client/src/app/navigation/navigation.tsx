import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Icon } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
}));

export default function Navigation() {
	const classes = useStyles();

	return (
		<div className={classes.grow}>
			<AppBar position="fixed" color="inherit">
				<Toolbar>
					<Typography variant="h6" noWrap>
						<Link style={{ textDecoration: 'none' }} to="/">
							<Icon>home</Icon>
						</Link>
					</Typography>
					<div className={classes.grow} />
					<Typography variant="button">
						<Link style={{ textDecoration: 'none' }} to="/todos">
							todos
						</Link>
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
}
