import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as graphqlUpload from 'graphql-upload/graphqlUploadExpress.js';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5174',
    credentials: true,
    allowedHeaders: [
      'Accept',
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'apollo-require-preflight',
    ],
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  });
  app.use(cookieParser());
  app.use(graphqlUpload({ maxFileSize: 10000000, maxFiles: 1 }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const formatedErrors = errors.reduce((acc, err) => {
          acc[err.property] = Object.values(err.constraints).join(', ');
          return acc;
        }, {});
        throw new BadRequestException(formatedErrors);
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
