/*
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Avis } from './avis.entity';
import { Reclamation } from './reclamation.entity';
import { Magasin } from './magasin.entity';

@Entity()
export class Utilisateur {
  @PrimaryGeneratedColumn('uuid')
  id: string; //idUtilisateur

  @Column()
  lname: string;

  @Column()
  fname: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  photo?: string;


  @Column({ name: 'registration_date', default: () => 'CURRENT_TIMESTAMP' })
  registrationDate: Date;



  @Column({ type: 'varchar',nullable: true })
  password?: string | null;

  @OneToMany(() => Avis, (avis) => avis.auteur)
  avis: Avis[];

  @OneToMany(() => Reclamation, (reclamation) => reclamation.utilisateur)
  reclamations: Reclamation[];

  @OneToMany(() => Magasin, (magasin) => magasin.proprietaire)
  magasins: Magasin[];


  
}

*/