import { Test } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

describe('TodoController', () => {
	let controller: TodoController;
	let todoService: TodoService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				{
					provide: TodoService,
					useValue: {
						Add: () => null,
						Delete: () => null,
						Find: () => null,
						Update: () => null,
					},
				},
			],
		}).compile();

		todoService = module.get(TodoService);
		controller = new TodoController(todoService);
	});

	it('creates the controller', async () => {
		expect(controller).toBeTruthy();
	});

	it('adds a todo', async () => {
		spyOn(todoService, 'Add').and.returnValue({ _id: 'todoId' });
		const res = await controller.AddTodo({} as never);
		expect(res).toStrictEqual({
			success: true,
			data: { _id: 'todoId' },
		});
	});

	it('deletes a todo', async () => {
		spyOn(todoService, 'Delete').and.returnValue({ _id: 'todoId' });
		const res = await controller.DeleteTodo('todoId');
		expect(res).toStrictEqual({
			success: true,
			data: { _id: 'todoId' },
		});
	});

	it('finds all todos', async () => {
		spyOn(todoService, 'Find').and.returnValue([]);
		const res = await controller.GetTodos();
		expect(res).toStrictEqual({
			success: true,
			data: [],
		});
	});

	it('updates a todo', async () => {
		spyOn(todoService, 'Update').and.returnValue({ _id: 'todoId' });
		const res = await controller.UpdateTodo('todoId', {
			_id: 'todoId',
		} as never);
		expect(res).toStrictEqual({
			success: true,
			data: { _id: 'todoId' },
		});
	});
});
