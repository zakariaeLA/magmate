// src/marketplace/entities/produit.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ImageProd } from './produit-image.entity';
import { Avis } from './avis.entity';
import { Reclamation } from './reclamation.entity'; // Importer l'entité Reclamation
import { Magasin } from './magasin.entity';

@Entity()
export class Produit {
  @PrimaryGeneratedColumn()
  idProduit: number;

  @Column()
  titre: string;

  @Column('text')
  description: string;

  @Column('float')
  prix: number;

  @Column()
  imagePrincipale: string;

  @Column()
  dateAjout: Date;

  @ManyToOne(() => Magasin, (magasin) => magasin.produits)
  magasin: Magasin;

  @OneToMany(() => ImageProd, (image) => image.produit)
  images: ImageProd[];

  @OneToMany(() => Avis, (avis) => avis.produit)
  avis: Avis[];

  // Ajout de la relation OneToMany pour les réclamations
  @OneToMany(() => Reclamation, (reclamation) => reclamation.produit)
  reclamations: Reclamation[]; // Lier un produit à plusieurs réclamations
}
