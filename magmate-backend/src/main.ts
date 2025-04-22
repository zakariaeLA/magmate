import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Pour servir des fichiers statiques (comme les images uploadées)
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', 
  });
  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
