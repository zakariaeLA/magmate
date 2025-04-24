import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { MarketplaceModule } from './marketplace/marketplace.module';

@Module({
  imports: [
    DatabaseModule, // Database module
    MarketplaceModule, // Marketplace module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}