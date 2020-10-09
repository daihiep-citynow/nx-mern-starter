import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as mongoose from 'mongoose';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	if (environment.name !== 'Test') app.use(morgan('combined'));

	app.enableCors(environment.http.cors);
	app.use(json());
	app.use(
		urlencoded({
			extended: true,
		}),
	);

	mongoose.set('useFindAndModify', false);

	await app.listen(environment.http.port, () => {
		Logger.log(
			`Revelry and awe are afoot at http${
				environment.http.ssl ? 's' : ''
			}://` + `${environment.http.host}:${environment.http.port}`,
		);
	});
}

bootstrap().catch((e) => console.log('ERR: ', e));
