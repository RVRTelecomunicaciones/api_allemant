import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';
import cors from 'cors';

import compression from 'compression';
import rateLimit from 'express-rate-limit';
import express, { json, urlencoded } from 'express';
import { ValidationPipe } from '@nestjs/common';

const PORT = process.env.PORT || 8080;
const PREFIX = process.env.PREFIX || '/';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const options = new DocumentBuilder()
    .setTitle('Allemant Peritos Valuadores - SGI')
    .setDescription('Sistema de Gestión Integral')
    .addBearerAuth({ type: 'apiKey', in: 'header', name: 'token' })
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${PREFIX}/docs`, app, document);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  app.use(
    cors({
      credentials: true,
    }),
  );
  app.use(helmet());
  app.use(compression());
  app.use(express.json()); //For JSON requests
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(rateLimit({ max: 1000, windowMs: 15 * 60 * 1000 }));
  app.setGlobalPrefix(PREFIX);

  await app.listen(PORT);
}
bootstrap();
