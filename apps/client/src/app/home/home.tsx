import React from 'react';
import './home.scss';

export const Home = () => (
	<div className="fade-in" id="home-page">
		<div
			style={{
				width: '100%',
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				textAlign: 'center',
			}}
		>
			<h1
				id="home-brand"
				title="Notice Everything Creative | Business Software Solutions"
			>
				<span className="white-text">notice</span>
				<span className="cyan-text">everything</span>
			</h1>
			<p className="white-text">
				<span className="standout amber-text">MERN </span>
				nx starter
			</p>
		</div>
	</div>
);

export default Home;
