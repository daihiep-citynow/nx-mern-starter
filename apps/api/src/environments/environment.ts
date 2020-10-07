export const environment = {
	production: false,
	name: 'Development',
	database: {
		uri: 'mongodb://localhost:27017/todos',
		options: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
	},
	http: {
		host: 'localhost',
		port: 3333,
		ip: '127.0.0.1',
		cors: {
			origin: [/localhost/],
			credentials: true,
		},
		ssl: false,
	},
};
