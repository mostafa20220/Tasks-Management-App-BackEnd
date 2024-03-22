"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const local_strategy_1 = require("./strategies/local.strategy");
const user_schema_1 = require("../users/user.schema");
const users_module_1 = require("../users/users.module");
const passport_1 = require("@nestjs/passport");
const localAuth_guard_1 = require("../common/guards/localAuth.guard");
const accessJwt_strategy_1 = require("./strategies/accessJwt.strategy");
const refreshJwt_strategy_1 = require("./strategies/refreshJwt.strategy");
const mongoose_1 = require("@nestjs/mongoose");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: user_schema_1.User.name,
                    schema: user_schema_1.UserSchema,
                },
            ]),
            jwt_1.JwtModule.register({}),
            passport_1.PassportModule,
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            local_strategy_1.LocalStrategy,
            users_service_1.UsersService,
            localAuth_guard_1.LocalAuthGuard,
            accessJwt_strategy_1.jwtStrategy,
            refreshJwt_strategy_1.RefreshJwtStrategy,
        ],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map