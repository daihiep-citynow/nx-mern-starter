import { Schema } from 'mongoose';

export const TodoSchema = new Schema(
	{
		title: { type: String, required: true },
		due: { type: Date, required: true },
		description: String,
		done: { type: Boolean, required: true, default: false },
	},
	{ timestamps: true },
);
