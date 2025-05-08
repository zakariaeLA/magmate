import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Prestataire } from './prestataire.entity';


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

  @ManyToOne(() => Prestataire, prestataire => prestataire.avis)
  prestataire: Prestataire;
}
