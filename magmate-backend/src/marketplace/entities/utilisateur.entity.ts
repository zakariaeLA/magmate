import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
  } from 'typeorm';
  import { Magasin } from './magasin.entity'; // chemin de magasin
  
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
    motDePasse: string;

    @Column({nullable:true})
  photoProfil: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
dateInscription: Date;

@OneToMany(() => Magasin, magasin => magasin.proprietaire)
  magasins: Magasin[];
  

  @OneToMany(() => Magasin, magasin => magasin.proprietaire)
  magasin: Magasin[];
  
  
  }
  