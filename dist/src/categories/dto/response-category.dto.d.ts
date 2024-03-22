import { ObjectId } from 'mongodb';
import { CreateCategoryDto } from './create-category.dto';
export declare class ResponseCategoryDto extends CreateCategoryDto {
    constructor();
    _id?: ObjectId;
}
