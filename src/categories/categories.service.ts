import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './category.schema';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async findUserCategories(userId: string): Promise<Category[]> {
    return await this.categoryModel.find(
      { user: userId },
      { __v: false, createdAt: false, updatedAt: false, user: false },
    );
  }

  async findCategoryById(categoryId: string): Promise<Category> {
    const category = await this.categoryModel.findById(categoryId, {
      __v: false,
      user: false,
    });
    if (!category) {
      throw new NotAcceptableException("category doesn't exist");
    }
    return category;
  }

  async findUserCategoryByName(
    userId: string,
    categoryName: string,
  ): Promise<Category> {
    const category = await this.categoryModel.findOne(
      {
        user: userId,
        name: categoryName,
      },
      { __v: false, user: false },
    );

    //TODO: if (!category) exist ? should i throw an exception or return null

    return category;
  }

  async createUserCategory(
    userId: string,
    createCategoryDto: CreateCategoryDto,
  ) {
    // : Promise<ResponseCategoryDto>
    const category = await this.findUserCategoryByName(
      userId,
      createCategoryDto.name,
    );

    if (category) {
      throw new NotAcceptableException('category already exists');
    }

    return await this.categoryModel.create({
      ...createCategoryDto,
      user: userId,
    });
  }

  async updateCategoryById(
    categoryId: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryModel.findOneAndUpdate(
      { _id: categoryId },
      updateCategoryDto,
      { new: true },
    );

    if (!category) {
      throw new NotAcceptableException("category doesn't exist");
    }

    return category;
  }

  async removeCategoryById(categoryId: string): Promise<Category> {
    const category = await this.categoryModel.findByIdAndDelete(categoryId);

    if (!category) {
      throw new NotAcceptableException("category doesn't exist");
    }

    return category;
  }
}
