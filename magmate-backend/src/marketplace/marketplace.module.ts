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
import { ImageProd } from './entities/produit-image.entity';
import { User } from 'src/user/entities/user.entity';
import { ProductController } from './controllers/product.controller';
import { CommentController } from './controllers/comment.controller';
import { ReclamationController } from './controllers/reclamation.controller';
import { ProductService } from './services/product.service';
import { CommentService } from './services/comment.service';
import { ReclamationService } from './services/reclamation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Produit,
      Reclamation,
      Avis,
      ImageProd,
      Magasin,
      User,
    ]),
  ],
  controllers: [
    ProduitsController,
    MagasinController,
    CommentController,
    ReclamationController,
    ProductController,
  ],
  providers: [
    ProduitsService,
    MagasinService,
    ProductService,
    CommentService,
    ReclamationService,
  ],
})
export class MarketplaceModule {}
