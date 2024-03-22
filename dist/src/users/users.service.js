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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./user.schema");
const mongoose_2 = require("mongoose");
const auth_service_1 = require("../auth/auth.service");
let UsersService = class UsersService {
    constructor(userModel, authService) {
        this.userModel = userModel;
        this.authService = authService;
    }
    async createUser(createUserDto) {
        const userExist = await this.userModel.findOne({
            email: createUserDto.email,
        });
        if (userExist) {
            throw new common_1.BadRequestException(`Email is already used`);
        }
        const user = await this.userModel.create(createUserDto);
        await user.save();
        delete user.password;
        return user;
    }
    async findAll() {
        return await this.userModel.find({}, { password: false, __v: false, hashedRT: false });
    }
    async findOne(id) {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new common_1.NotAcceptableException("user doesn't exist");
        }
        return user;
    }
    async findOneAndUpdate(id, updateUserDto) {
        const newUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
            new: true,
        });
        if (!newUser) {
            throw new common_1.NotAcceptableException("user doesn't exist");
        }
        return newUser;
    }
    async remove(id) {
        const user = await this.findOne(id);
        if (!user) {
            throw new common_1.NotAcceptableException("user doesn't exist");
        }
        await user.deleteOne();
        return user;
    }
    async findUserByEmail(email) {
        return await this.userModel.findOne({ email });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        auth_service_1.AuthService])
], UsersService);
//# sourceMappingURL=users.service.js.map