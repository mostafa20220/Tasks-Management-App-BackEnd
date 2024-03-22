import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Category } from 'src/categories/category.schema';
import { User } from 'src/users/user.schema';

@Schema()
export class Task extends Document {
  @Prop({ required: true, index: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ default: false })
  completed: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category?: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

TaskSchema.index({ title: 1, user: 1 }, { unique: true });
TaskSchema.virtual('categoryName', {
  ref: 'Category', // The model to use
  localField: 'category', // Find people where `localField`
  foreignField: '_id', // is equal to `foreignField`
  justOne: true, // And only get the first one found
});
export type TaskDocument = Task & Document;
