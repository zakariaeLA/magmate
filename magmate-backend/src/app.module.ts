import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { MarketplaceModule } from './marketplace/marketplace.module'; // Importer correctement MarketplaceModule

@Module({
  imports: [
    DatabaseModule, // Assurez-vous que DatabaseModule est bien importé
    
   // TypeOrmModule.forRoot(), // Connexion de base de données via TypeOrm
    MarketplaceModule, // Ajouter MarketplaceModule ici
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
