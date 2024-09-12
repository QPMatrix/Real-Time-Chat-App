import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
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
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }));
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
  await app.listen(4000);
}
bootstrap();
