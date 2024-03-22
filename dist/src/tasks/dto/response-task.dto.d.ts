import { ObjectId } from 'mongodb';
import { ResponseCategoryDto } from 'src/categories/dto/response-category.dto';
export declare class ResponseTaskDto {
    title: string;
    description?: string;
    completed?: boolean;
    _id: ObjectId;
    category?: ResponseCategoryDto;
}
