import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne
} from 'typeorm';
import { Magasin } from './magasin.entity';
import { Image } from './image.entity'; // Table des images liées au produit

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
  imagePrincipale: string;  // Stocke l'image principale du produit (nom du fichier)

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateAjout: Date;

  @ManyToOne(() => Magasin, (magasin) => magasin.produits, { nullable: true })
  magasin: Magasin;

  @OneToMany(() => Image, (image) => image.produit)  // Relation OneToMany pour les autres images
  images: Image[];
}
