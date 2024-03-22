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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const response_user_dto_1 = require("../users/dto/response-user.dto");
const class_transformer_1 = require("class-transformer");
const scraper_1 = require("./selenium/scraper");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async signin(user) {
        const tokens = await this.generateTokens(user._id);
        const userResponse = (0, class_transformer_1.plainToClass)(response_user_dto_1.ResponseUserDto, user.toObject());
        return {
            user: userResponse,
            tokens,
        };
    }
    async signup(signupDto) {
        const emailExist = await this.userService.findUserByEmail(signupDto.email);
        if (emailExist) {
            throw new common_1.NotAcceptableException('Email already exists');
        }
        const scrappedData = await (0, scraper_1.scrapeProfile)(signupDto.linkedinUrl);
        if (!scrappedData) {
            throw new common_1.NotAcceptableException('Invalid linkedin url, make sure to provide a valid linkedin profile url, and your linkedin profile is public');
        }
        signupDto = {
            ...signupDto,
            ...scrappedData,
        };
        const newUser = await this.userService.createUser(signupDto);
        const tokens = await this.generateTokens(newUser._id);
        const userResponse = (0, class_transformer_1.plainToClass)(response_user_dto_1.ResponseUserDto, newUser.toObject());
        return {
            user: userResponse,
            tokens,
        };
    }
    async logout(userId) {
        await this.updateRT(userId);
        return {
            message: 'Logout successfully',
        };
    }
    async refreshTokens(payload) {
        const tokens = await this.generateTokens(payload.sub);
        return { tokens };
    }
    async generateTokens(id) {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({
                sub: id,
            }, {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
                secret: process.env.JWT_SECRET,
            }),
            this.jwtService.signAsync({
                sub: id,
            }, {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
                secret: process.env.JWT_SECRET,
            }),
        ]);
        await this.updateRT(id, rt);
        return {
            accessToken: at,
            refreshToken: rt,
        };
    }
    async updateRT(userId, newRT = null) {
        const hashedRT = newRT ? await this.hashData(newRT) : null;
        await this.userService.findOneAndUpdate(userId, {
            hashedRT,
        });
    }
    async hashData(data) {
        return await bcrypt.hash(data, 10);
    }
    async validateUser(singInDto) {
        const userExist = await this.userService.findUserByEmail(singInDto.email);
        if (!userExist) {
            throw new common_1.UnauthorizedException('Invalid Credentials');
        }
        const isPasswordMatch = await bcrypt.compare(singInDto.password, userExist.password);
        if (!isPasswordMatch) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return userExist;
    }
    async validateRT(userID, rt) {
        const user = await this.userService.findOne(userID);
        if (!user.hashedRT)
            return false;
        const isRTMatch = await bcrypt.compare(rt, user.hashedRT);
        if (!isRTMatch)
            return false;
        return true;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map