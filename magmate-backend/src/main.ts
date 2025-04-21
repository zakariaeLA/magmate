import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use('/public', express.static(join(__dirname, '..', 'public')));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
