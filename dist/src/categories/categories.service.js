"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const category_schema_1 = require("./category.schema");
const mongoose_2 = require("mongoose");
let CategoriesService = class CategoriesService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    async findUserCategories(userId) {
        return await this.categoryModel.find({ user: userId }, { __v: false, createdAt: false, updatedAt: false, user: false });
    }
    async findCategoryById(categoryId) {
        const category = await this.categoryModel.findById(categoryId, {
            __v: false,
            user: false,
        });
        if (!category) {
            throw new common_1.NotAcceptableException("category doesn't exist");
        }
        return category;
    }
    async findUserCategoryByName(userId, categoryName) {
        const category = await this.categoryModel.findOne({
            user: userId,
            name: categoryName,
        }, { __v: false, user: false });
        return category;
    }
    async createUserCategory(userId, createCategoryDto) {
        const category = await this.findUserCategoryByName(userId, createCategoryDto.name);
        if (category) {
            throw new common_1.NotAcceptableException('category already exists');
        }
        return await this.categoryModel.create({
            ...createCategoryDto,
            user: userId,
        });
    }
    async updateCategoryById(categoryId, updateCategoryDto) {
        const category = await this.categoryModel.findOneAndUpdate({ _id: categoryId }, updateCategoryDto, { new: true });
        if (!category) {
            throw new common_1.NotAcceptableException("category doesn't exist");
        }
        return category;
    }
    async removeCategoryById(categoryId) {
        const category = await this.categoryModel.findByIdAndDelete(categoryId);
        if (!category) {
            throw new common_1.NotAcceptableException("category doesn't exist");
        }
        return category;
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_schema_1.Category.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map