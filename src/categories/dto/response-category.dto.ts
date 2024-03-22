import { ObjectId } from 'mongodb';
import { CreateCategoryDto } from './create-category.dto';
import { Expose, Transform } from 'class-transformer';

export class ResponseCategoryDto extends CreateCategoryDto {
  constructor() {
    super();
  }

  @Expose()
  @Transform((params) => params.obj._id.toString())
  _id?: ObjectId;
  // tasks?: Task[];
}
