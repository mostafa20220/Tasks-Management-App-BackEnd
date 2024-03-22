"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerGlobals = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const helmet_1 = require("helmet");
const passport = require("passport");
const scraper_1 = require("./auth/selenium/scraper");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: true,
    });
    app.use((0, helmet_1.default)());
    app.use(passport.initialize());
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    registerGlobals(app);
    const profileData = await (0, scraper_1.scrapeProfile)('https://www.linkedin.com/in/mostafa--hesham');
    console.log('profileData:', profileData);
    await app.listen(process.env.APP_PORT || 3000);
}
function registerGlobals(app) {
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector), {
        strategy: 'exposeAll',
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    }));
}
exports.registerGlobals = registerGlobals;
bootstrap();
//# sourceMappingURL=main.js.map