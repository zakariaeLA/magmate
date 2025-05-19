import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Produit } from './produit.entity';
import { User } from '../../user/entities/user.entity';

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

  @OneToMany(() => Produit, (produit) => produit.magasin)
  produits: Produit[];

  @ManyToOne(() => User, (user) => user.magasins)
  @JoinColumn({ name: 'proprietaireIdUtilisateur' })
  proprietaire: User;

  @Column({ type: 'uuid' })
  proprietaireIdUtilisateur: string;
}