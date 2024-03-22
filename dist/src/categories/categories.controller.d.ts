import { CategoriesService } from './categories.service';
import { ResponseCategoryDto } from './dto/response-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    getUserCategories(id: string): Promise<{
        categories: ResponseCategoryDto[];
    }>;
    createUserCategory(userId: string, createCategoryDto: CreateCategoryDto): Promise<{
        category: ResponseCategoryDto;
    }>;
    getCategory(categoryId: string): Promise<{
        category: ResponseCategoryDto;
    }>;
    updateCategory(categoryId: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        category: ResponseCategoryDto;
    }>;
    removeCategory(categoryId: string): Promise<{
        category: ResponseCategoryDto;
    }>;
}
