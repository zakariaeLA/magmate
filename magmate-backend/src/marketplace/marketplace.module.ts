import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProduitsController } from './controllers/ProduitController';
import { ProduitsService } from './services/ProduitService';
import { Produit } from './entities/Produit.entity';
import { Magasin } from './entities/Magasin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Produit, Magasin])],
  controllers: [ProduitsController],
  providers: [ProduitsService],
})
export class MarketplaceModule {}
