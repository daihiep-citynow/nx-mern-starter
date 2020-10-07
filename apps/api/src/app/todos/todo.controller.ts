import {
	Controller,
	Get,
	Post,
	Body,
	Put,
	Param,
	Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo, TodoDto } from '@nx-mern-starter/interfaces';

@Controller('/api/todos')
export class TodoController {
	constructor(private readonly todoService: TodoService) {}

	@Post()
	async AddTodo(@Body() body: TodoDto) {
		try {
			const data = await this.todoService.Add(body);
			return { success: true, data };
		} catch (e) {
			return { success: false, message: e.message };
		}
	}

	@Delete(':id')
	async DeleteTodo(@Param('id') id: string) {
		try {
			const data = await this.todoService.Delete(id);
			return { success: true, data };
		} catch (e) {
			return { success: false, message: e.message };
		}
	}

	@Get()
	async GetTodos() {
		try {
			const data = await this.todoService.Find();
			return { success: true, data };
		} catch (e) {
			return { success: false, message: e.message };
		}
	}

	@Put(':id')
	async UpdateTodo(@Param('id') id: string, @Body() todo: Todo) {
		try {
			const data = await this.todoService.Update(id, todo);
			return { success: true, data };
		} catch (e) {
			return { success: false, message: e.message };
		}
	}
}
