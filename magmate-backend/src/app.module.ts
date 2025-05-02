import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FirebaseAdminModule } from './firebase/firebase-admin.module';
import { ProfileModule } from './profile/profile.module';
import { MarketplaceModule } from './marketplace/marketplace.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [

    DatabaseModule,
    AuthModule,
    UserModule,
    FirebaseAdminModule,
    ProfileModule,
    MarketplaceModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads', 
    }),
    
  ],
  controllers: [AppController, ],
  providers: [AppService, ],
})
export class AppModule {}
