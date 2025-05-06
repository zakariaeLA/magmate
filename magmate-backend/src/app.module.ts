import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FirebaseAdminModule } from './firebase/firebase-admin.module';
import { ProfileModule } from './profile/profile.module';
//import { MarketplaceModule } from './marketplace/marketplace.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PrestataireModule } from './prestataire/prestataire.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Dossier où les fichiers statiques sont stockés (ex: 'public')
      serveRoot: '/uploads', // L'URL de base pour accéder aux fichiers (ex: http://localhost:3000/static)
    }),
    DatabaseModule, // Database module
    //MarketplaceModule,
    PrestataireModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    FirebaseAdminModule,
    ProfileModule, // Marketplace module
  ],
  controllers: [AppController, ],
  providers: [AppService, ],
})
export class AppModule {}
