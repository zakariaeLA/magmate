import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { MarketplaceModule } from './marketplace/marketplace.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Dossier où les fichiers statiques sont stockés (ex: 'public')
      serveRoot: '/uploads', // L'URL de base pour accéder aux fichiers (ex: http://localhost:3000/static)
    }),
    DatabaseModule, // Database module
    MarketplaceModule, // Marketplace module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
