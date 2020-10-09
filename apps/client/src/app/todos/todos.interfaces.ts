import { Todo, TodoDto } from '@nx-mern-starter/interfaces';

export interface TodosProps {
	todos: TodoDto[];
}

export interface TodoFormProps {
	open: boolean;
	onClose: (value:unknown) => void;
}

export interface TodoFormState {
	formValue: Partial<Todo>;
}

export interface TodosState {
	todos: TodoDto[];
	working: boolean;
	showAddDialog: boolean;
}

export interface TodosListState {
	[index: string]: string;
}
