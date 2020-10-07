import { Document } from 'mongoose';
import { Todo } from './todo.interface';

export interface TodoDocument extends Todo, Document {}
