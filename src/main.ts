import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import helmet from 'helmet';
import * as passport from 'passport';
import { scrapeProfile } from './auth/selenium/scraper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.use(helmet());
  app.use(passport.initialize()); // Initialize Passport.js

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // app.setGlobalPrefix('api', { exclude: [] });
  registerGlobals(app);

  // Get user linkedin info
  const profileData = await scrapeProfile(
    'https://www.linkedin.com/in/mostafa--hesham',
  );
  console.log('profileData:', profileData);

  await app.listen(process.env.APP_PORT || 3000);
}

export function registerGlobals(app: INestApplication) {
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: 'exposeAll',
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    }),
  );
}

bootstrap();
