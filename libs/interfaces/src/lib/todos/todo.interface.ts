import { BaseDocument } from '../base.document';

export interface Todo extends BaseDocument {
	description?: string;
	done?: boolean;
	due: Date | string;
	title: string;
}
