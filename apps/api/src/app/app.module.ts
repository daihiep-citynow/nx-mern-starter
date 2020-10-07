import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '../environments/environment';
import { TodosModule } from './todos/todos.module';
import { AppController } from './app.controller';

@Module({
	imports: [
		MongooseModule.forRoot(
			environment.database.uri,
			environment.database.options,
		),
		TodosModule,
	],
	controllers: [AppController],
})
export class AppModule {}
