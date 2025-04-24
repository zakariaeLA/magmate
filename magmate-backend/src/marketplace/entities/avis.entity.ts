import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Utilisateur } from './utilisateur.entity';
import { Produit } from './produit.entity';

@Entity()
export class Avis {
  @PrimaryGeneratedColumn()
  idAvis: number;

  @Column()
  note: number;

  @Column('text')
  commentaire: string;

  @Column()
  date: Date;

  @ManyToOne(() => Utilisateur, utilisateur => utilisateur.avis)
  auteur: Utilisateur;

  @ManyToOne(() => Produit, produit => produit.avis)
  produit: Produit;
}
