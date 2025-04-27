import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FirebaseAdminModule } from './firebase/firebase-admin.module';
import { ProfileModule } from './profile/profile.module';
import { MarketplaceModule } from './marketplace/marketplace.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    FirebaseAdminModule,
    ProfileModule,
    MarketplaceModule,
  ],
  controllers: [AppController, ],
  providers: [AppService, ],
})
export class AppModule {}
