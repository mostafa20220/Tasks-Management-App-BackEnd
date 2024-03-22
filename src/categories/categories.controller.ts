import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AccessJwtGuard } from 'src/common/guards/accessJwt.guard';
import { ResponseCategoryDto } from './dto/response-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCurrentUserId } from 'src/common/decorators/getCurrentUserId.decorator';
import { plainToInstance } from 'class-transformer';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('users/me/categories')
@UseGuards(AccessJwtGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getUserCategories(
    @GetCurrentUserId() id: string,
  ): Promise<{ categories: ResponseCategoryDto[] }> {
    const categories = await this.categoriesService.findUserCategories(id);
    const categoriesResponse = plainToInstance(ResponseCategoryDto, categories);
    return { categories: categoriesResponse };
  }

  @Post()
  async createUserCategory(
    @GetCurrentUserId() userId: string,
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<{ category: ResponseCategoryDto }> {
    const newCategory = await this.categoriesService.createUserCategory(
      userId,
      createCategoryDto,
    );

    const responseCategory = plainToInstance(
      ResponseCategoryDto,
      newCategory.toObject(),
    );

    return { category: responseCategory };
  }

  @Get(':categoryId')
  async getCategory(
    @Param('categoryId') categoryId: string,
  ): Promise<{ category: ResponseCategoryDto }> {
    const category = await this.categoriesService.findCategoryById(categoryId);
    const categoryResponse = plainToInstance(
      ResponseCategoryDto,
      category.toObject(),
    );
    return { category: categoryResponse };
  }

  @Patch(':categoryId')
  async updateCategory(
    @Param('categoryId') categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<{ category: ResponseCategoryDto }> {
    const category = await this.categoriesService.updateCategoryById(
      categoryId,
      updateCategoryDto,
    );
    const categoryResponse = plainToInstance(
      ResponseCategoryDto,
      category.toObject(),
    );
    return { category: categoryResponse };
  }

  @Delete(':categoryId')
  async removeCategory(
    @Param('categoryId') categoryId: string,
  ): Promise<{ category: ResponseCategoryDto }> {
    const category =
      await this.categoriesService.removeCategoryById(categoryId);
    const categoryResponse = plainToInstance(
      ResponseCategoryDto,
      category.toObject(),
    );
    return { category: categoryResponse };
  }
}
