import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 🔓 Autoriser les appels depuis Angular (http://localhost:4200)
  app.enableCors();

  // 📂 Exposer le dossier public pour les images
  app.use('/public', express.static(join(__dirname, '..', 'public')));
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', 
  });

  // ✅ Activer la validation automatique pour les DTO
  app.useGlobalPipes(new ValidationPipe());

  // 🚀 Lancer le serveur

  
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
