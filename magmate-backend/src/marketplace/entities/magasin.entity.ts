import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Produit } from './produit.entity';
import { Utilisateur } from './utilisateur.entity';

@Entity()
export class Magasin {
  @PrimaryGeneratedColumn()
  idMagasin: number;

  @Column()
  nom: string;

  @Column('text')
  description: string;

  @Column()
  image: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateCreation: Date;

  @Column()
  localisation: string;

  @Column()
  horaire: string;

  @Column()
  telephone: string;

  @Column()
  ville: string;
  @Column({ default: false })
  estApprouve: boolean;

  // Relation un à plusieurs entre Magasin et Produit
  @OneToMany(() => Produit, (produit) => produit.magasin)
  produits: Produit[];

  @ManyToOne(() => Utilisateur, (utilisateur) => utilisateur.magasins)
  proprietaire: Utilisateur;
}
