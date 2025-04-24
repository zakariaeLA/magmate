import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Utilisateur } from './utilisateur.entity';
import { Produit } from './produit.entity';

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
  dateCreation: Date;

  @Column()
  localisation: string;

  @Column()
  horaire: string;

  @Column()
  telephone: string;

  @Column()
  ville: string;

  @ManyToOne(() => Utilisateur, utilisateur => utilisateur.magasins)
  proprietaire: Utilisateur;

  @OneToMany(() => Produit, produit => produit.magasin)
  produits: Produit[];
  
  @Column({ default: false }) 
  estApprouve: boolean;
}