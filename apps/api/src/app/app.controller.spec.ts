import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
	let controller: AppController;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			controllers: [AppController],
		}).compile();
		controller = module.get(AppController);
	});

	it('creates the controller', async () => {
		expect(controller).toBeTruthy();
	});

	it('has an Index method', async () => {
		spyOn(controller, 'Index').and.returnValue('It works');
		const res = await controller.Index({} as never);
		expect(res).toEqual('It works');
	});
});
