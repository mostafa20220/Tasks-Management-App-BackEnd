import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/user.schema';

@Schema()
export class Category extends Document {
  @Prop({ index: true, required: true })
  name: string;

  @Prop({ minlength: 12, maxlength: 500 })
  description: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop({ index: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user?: User;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.index({ name: 1, user: 1 }, { unique: true });

export type CategoryDocument = Category & Document;
