import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Magasin } from './entities/magasin.entity';
import { Produit } from './entities/produit.entity';
import { Image } from './entities/image.entity'; // Assurez-vous d'importer l'entité Image correctement
import { StoreService } from './service/store.service';
import { StoreController } from './Controller/store.controller';
import { ProductController } from './Controller/product.controller';
import { ImageService } from './service/image.service';
import { ProduitService } from './service/product.service';
import { ImageController } from './Controller/image.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Magasin, Produit, Image]), // Ajoutez toutes les entités ici
  ],
  providers: [StoreService,ImageService,ProduitService],
  controllers: [StoreController,ProductController,ImageController],
})
export class MarketplaceModule {}
