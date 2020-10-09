import { TodoDocument } from '@nx-mern-starter/interfaces';
import { Model, model } from 'mongoose';
import { TodoSchema } from './todo.schema';

describe('TodoSchema', () => {
	let todoModel: Model<TodoDocument>;

	beforeEach(async () => {
		todoModel = model('Todo', TodoSchema);
	});

	afterEach(async () => {
		todoModel = undefined;
	});

	it('saves to the todos collection', () => {
		expect(todoModel.collection.name).toBe('todos');
	});

	it('creates an instance of Todo', async () => {
		const todo = new todoModel({
			name: 'todoName',
		});

		expect(todo instanceof Model).toBe(true);
	});

	it('fails to save an invalid document', async () => {
		const todo = new todoModel(),
			error = todo.validateSync();

		expect(Object.keys(error.errors).length).toBe(2);
		expect(error.errors.title.message).toBe('Path `title` is required.');
		expect(error.errors.due.message).toBe('Path `due` is required.');
	});
});
