import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 📂 Servir le dossier "uploads" à la racine via /uploads/
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // 📂 Servir le dossier "public" via /public/
  app.use('/public', express.static(join(__dirname, '..', 'public')));

  // 🔓 CORS activé pour permettre les appels depuis le frontend
  app.enableCors();

  // ✅ Validation automatique des DTOs
  app.useGlobalPipes(new ValidationPipe());

  // 📦 Support des payloads volumineux (images, base64, etc.)
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // 📘 Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('API de Magmate')
    .setDescription("La documentation de l'API pour gérer les magasins et produits")
    .setVersion('1.0')
    .addTag('magasins')
    .addTag('produits')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // 🚀 Démarrage de l'application
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
