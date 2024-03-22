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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const getCurrentUserId_decorator_1 = require("../common/decorators/getCurrentUserId.decorator");
const update_user_dto_1 = require("./dto/update-user.dto");
const class_transformer_1 = require("class-transformer");
const response_user_dto_1 = require("./dto/response-user.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async findAll() {
        const users = await this.usersService.findAll();
        const usersResponse = (0, class_transformer_1.plainToInstance)(response_user_dto_1.ResponseUserDto, users);
        return { users: usersResponse };
    }
    async getProfile(id) {
        const user = await this.usersService.findOne(id);
        const userResponse = (0, class_transformer_1.plainToInstance)(response_user_dto_1.ResponseUserDto, user.toObject());
        return { user: userResponse };
    }
    async UpdateProfile(id, updateUserDto) {
        const user = await this.usersService.findOneAndUpdate(id, updateUserDto);
        const userResponse = (0, class_transformer_1.plainToInstance)(response_user_dto_1.ResponseUserDto, user.toObject());
        return { user: userResponse };
    }
    async removeProfile(id) {
        await this.usersService.remove(id);
        return { message: 'User removed successfully' };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, getCurrentUserId_decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Patch)('me'),
    __param(0, (0, getCurrentUserId_decorator_1.GetCurrentUserId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "UpdateProfile", null);
__decorate([
    (0, common_1.Delete)('me'),
    __param(0, (0, getCurrentUserId_decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "removeProfile", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map