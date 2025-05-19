import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Produit } from './produit.entity';
import { User } from '../../user/entities/user.entity';

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

  @ManyToOne(() => User, utilisateur => utilisateur.avis)
  auteur: User;

  @ManyToOne(() => Produit, produit => produit.avis)
  produit: Produit;
}
