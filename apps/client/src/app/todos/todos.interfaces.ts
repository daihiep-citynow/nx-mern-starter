import { Todo, TodoDto } from '@nx-mern-starter/interfaces';

export interface TodosProps {
	todos: TodoDto[];
}

export interface TodoFormProps {
	open: boolean;
	onClose: (value: TodoFormResponse) => void;
	todo: Todo;
}

export interface TodoFormResponse {
	success: boolean;
	todo?: TodoDto;
	message?: string;
}

export interface TodoFormState {
	formValue: Partial<Todo>;
}

export interface TodosState {
	todos: TodoDto[];
	todo?: TodoDto;
	working: boolean;
	showTodoForm: boolean;
	showSnackbar: boolean;
	msg?: string;
}

export interface TodosListProps extends TodosProps {
	onToggleDone(todo: TodoDto): Promise<void>;

	onEdit(todo: TodoDto): Promise<void>;

	onDelete(todo: TodoDto): Promise<void>;
}

export interface TodosListState {
	[index: string]: string;
}
