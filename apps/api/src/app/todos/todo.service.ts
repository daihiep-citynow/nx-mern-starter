import { Injectable } from '@nestjs/common';
import { TodoModel } from './todo.decorators';
import { Model } from 'mongoose';
import { TodoDocument, Todo } from '@nx-mern-starter/interfaces';

@Injectable()
export class TodoService {
	constructor(
		@TodoModel private readonly todoRepository: Model<TodoDocument>,
	) {}

	async Add(t: Todo): Promise<TodoDocument> {
		return await this.todoRepository.create(t);
	}

	async Delete(id: string): Promise<TodoDocument> {
		return this.todoRepository.findByIdAndRemove(id);
	}

	async Find(): Promise<Todo[]> {
		return this.todoRepository.find();
	}

	async Update(id: string, todo: Todo): Promise<TodoDocument> {
		return this.todoRepository.findByIdAndUpdate(id, todo, { new: true });
	}
}
