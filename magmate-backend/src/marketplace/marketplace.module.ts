import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProduitsController } from './controllers/ProduitController';
import { MagasinController } from './controllers/MagasinController';
import { MagasinService } from './services/MagasinService';
import { ProduitsService } from './services/ProduitService';
import { Produit } from './entities/produit.entity';
import { Magasin } from './entities/magasin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Produit, Magasin])],
  controllers: [ProduitsController, MagasinController],
  providers: [ProduitsService, MagasinService],
})
export class MarketplaceModule {}
