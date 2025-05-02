import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Avis } from './avis.entity';
import { Reclamation } from './reclamation.entity';
import { Magasin } from './magasin.entity';

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

  @OneToMany(() => Avis, (avis) => avis.auteur)
  avis: Avis[];

  @OneToMany(() => Reclamation, (reclamation) => reclamation.utilisateur)
  reclamations: Reclamation[];

  @OneToMany(() => Magasin, (magasin) => magasin.proprietaire)
  magasins: Magasin[];
}
