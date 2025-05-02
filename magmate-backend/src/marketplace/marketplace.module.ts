import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProduitsController } from './controllers/ProduitController';
import { MagasinController } from './controllers/MagasinController';
import { MagasinService } from './services/MagasinService';
import { ProduitsService } from './services/ProduitService';
import { Produit } from './entities/produit.entity';
import { Magasin } from './entities/magasin.entity';
import { Reclamation } from './entities/reclamation.entity';
import { Avis } from './entities/avis.entity';
import { User } from 'src/user/entities/user.entity';
import { ProductController1 } from './controllers/product.controller';
import { CommentController } from './controllers/comment.controller';
import { ReclamationController } from './controllers/reclamation.controller';
import { ProductService } from './services/product.service';
import { CommentService } from './services/comment.service';
import { ReclamationService } from './services/reclamation.service';
import { Image } from './entities/image.entity';
import { StoreService } from './service/store.service';
import { StoreController } from './Controller/store.controller';
import { ProductController } from './Controller/product.controller';
import { ImageService } from './service/image.service';
import { ProduitService } from './service/product.service';
import { ImageController } from './Controller/image.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Produit,
      Reclamation,
      Avis,
      Magasin,
      User,Image,

    ]),
  ],
  controllers: [
    ProduitsController,
    MagasinController,
    CommentController,
    ReclamationController,
    ProductController1,
    StoreController,
    ProductController,
    ImageController,
  ],
  providers: [
    ProduitsService,
    MagasinService,
    ProductService,
    CommentService,
    ReclamationService,
    StoreService,
    ImageService,
    ProduitService,
  ],
})
export class MarketplaceModule {}
