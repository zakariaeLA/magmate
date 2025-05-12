import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // Importez Swagger
import * as express from 'express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/',
  });


  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  await app.listen(process.env.PORT || 3000);

  app.useGlobalPipes(new ValidationPipe());

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Configuration de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Magmate') 
    .setDescription(
      "La documentation de l'API pour gérer les magasins et produits",
    ) // Description
    .setVersion('1.0') // Version de l'API
    .addTag('magasins') // Vous pouvez ajouter des tags pour organiser l'API
    .addTag('produits') // Exemple de tag pour les produits
    .build();

  const document = SwaggerModule.createDocument(app, config); // Créez le document Swagger
  SwaggerModule.setup('swagger', app, document); // Configurez Swagger pour qu'il soit accessible via "/api"

  // Démarrer l'application sur un port spécifié dans les variables d'environnement ou sur 3000

}

bootstrap();
