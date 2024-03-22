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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseTaskDto = void 0;
const mongodb_1 = require("mongodb");
const class_transformer_1 = require("class-transformer");
const response_category_dto_1 = require("../../categories/dto/response-category.dto");
class ResponseTaskDto {
}
exports.ResponseTaskDto = ResponseTaskDto;
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ResponseTaskDto.prototype, "title", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ResponseTaskDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], ResponseTaskDto.prototype, "completed", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)((params) => params.obj._id.toString()),
    __metadata("design:type", mongodb_1.ObjectId)
], ResponseTaskDto.prototype, "_id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Transform)((params) => {
        return params.obj.category
            ? { ...params.obj.category, _id: params.obj.category._id.toString() }
            : null;
    }),
    __metadata("design:type", response_category_dto_1.ResponseCategoryDto)
], ResponseTaskDto.prototype, "category", void 0);
//# sourceMappingURL=response-task.dto.js.map