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
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const categories_service_1 = require("./categories.service");
const accessJwt_guard_1 = require("../common/guards/accessJwt.guard");
const response_category_dto_1 = require("./dto/response-category.dto");
const create_category_dto_1 = require("./dto/create-category.dto");
const getCurrentUserId_decorator_1 = require("../common/decorators/getCurrentUserId.decorator");
const class_transformer_1 = require("class-transformer");
const update_category_dto_1 = require("./dto/update-category.dto");
let CategoriesController = class CategoriesController {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    async getUserCategories(id) {
        const categories = await this.categoriesService.findUserCategories(id);
        const categoriesResponse = (0, class_transformer_1.plainToInstance)(response_category_dto_1.ResponseCategoryDto, categories);
        return { categories: categoriesResponse };
    }
    async createUserCategory(userId, createCategoryDto) {
        const newCategory = await this.categoriesService.createUserCategory(userId, createCategoryDto);
        const responseCategory = (0, class_transformer_1.plainToInstance)(response_category_dto_1.ResponseCategoryDto, newCategory.toObject());
        return { category: responseCategory };
    }
    async getCategory(categoryId) {
        const category = await this.categoriesService.findCategoryById(categoryId);
        const categoryResponse = (0, class_transformer_1.plainToInstance)(response_category_dto_1.ResponseCategoryDto, category.toObject());
        return { category: categoryResponse };
    }
    async updateCategory(categoryId, updateCategoryDto) {
        const category = await this.categoriesService.updateCategoryById(categoryId, updateCategoryDto);
        const categoryResponse = (0, class_transformer_1.plainToInstance)(response_category_dto_1.ResponseCategoryDto, category.toObject());
        return { category: categoryResponse };
    }
    async removeCategory(categoryId) {
        const category = await this.categoriesService.removeCategoryById(categoryId);
        const categoryResponse = (0, class_transformer_1.plainToInstance)(response_category_dto_1.ResponseCategoryDto, category.toObject());
        return { category: categoryResponse };
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, getCurrentUserId_decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getUserCategories", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, getCurrentUserId_decorator_1.GetCurrentUserId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "createUserCategory", null);
__decorate([
    (0, common_1.Get)(':categoryId'),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getCategory", null);
__decorate([
    (0, common_1.Patch)(':categoryId'),
    __param(0, (0, common_1.Param)('categoryId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Delete)(':categoryId'),
    __param(0, (0, common_1.Param)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "removeCategory", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, common_1.Controller)('users/me/categories'),
    (0, common_1.UseGuards)(accessJwt_guard_1.AccessJwtGuard),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
//# sourceMappingURL=categories.controller.js.map