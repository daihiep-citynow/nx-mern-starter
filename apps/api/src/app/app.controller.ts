import { Controller, Get, Res } from '@nestjs/common';

@Controller()
export class AppController {
	@Get()
	async Index(@Res() res) {
		return res.status(200).send('TODO API');
	}
}
