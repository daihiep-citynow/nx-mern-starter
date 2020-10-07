import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from './todo.schema';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }]),
	],
	providers: [TodoService],
	controllers: [TodoController],
})
export class TodosModule {}
