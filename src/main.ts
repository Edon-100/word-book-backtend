import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as RateLimit from 'express-rate-limit';
import { HttpExceptionFilter } from './filters/all-exceptions.filter';
// import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());
  app.use(
    RateLimit({
      windowMs: 1 * 60 * 1000, // 1minutes
      max: 30, // limit each IP to 100 requests per windowMs
    }),
  );
  app.use(helmet());
  // app.use(csurf());
  app.useGlobalPipes(
    new ValidationPipe({
      // disableErrorMessages: true,
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT);
}
bootstrap();
