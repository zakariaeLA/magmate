import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Magasin } from './Magasin.entity';

@Entity()
export class Utilisateur {
  @PrimaryGeneratedColumn()
  idUtilisateur: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column({ unique: true })
  email: string;

  @Column()
  photoProfil: string;

  @Column()
  dateInscription: Date;

  @Column({ select: false })
  motDePasse: string;

  @OneToMany(() => Magasin, (magasin) => magasin.proprietaire)
  magasins: Magasin[];
}
