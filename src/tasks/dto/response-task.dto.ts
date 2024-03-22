import { ObjectId } from 'mongodb';
import { Expose, Transform } from 'class-transformer';
import { ResponseCategoryDto } from 'src/categories/dto/response-category.dto';

export class ResponseTaskDto {
  @Expose()
  title: string;

  @Expose()
  description?: string;

  @Expose()
  completed?: boolean;

  @Expose()
  @Transform((params) => params.obj._id.toString())
  _id: ObjectId;

  /**
   *     "tasks": [
        {
            "title": "Task-1",
            "description": "no need",
            "completed": false,
            "_id": "65fb3bee7e49c70cf56d6431",
            "category": "{ _id: new ObjectId('65fb3bee7e49c70cf56d642f'), name: 'Islam' }"
        }]
  */

  @Expose()
  @Transform((params) => {
    return params.obj.category
      ? { ...params.obj.category, _id: params.obj.category._id.toString() }
      : null;
  })
  category?: ResponseCategoryDto;
}
