import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { User } from '../../user/entities/user.entity'; 
import { Avis } from '../../marketplace/entities/avis.entity';
import { Reclamation} from '../../marketplace/entities/reclamation.entity';

@Entity()
export class Prestataire {
  @PrimaryGeneratedColumn('uuid')
  idPrestataire: string;

  @Column()
  specialite: string;

  @Column()
  experience: string;

  @Column()
  localisation: string;


  @Column({ default: true })
  disponibilite: boolean;

  @Column()
  telephone: string;

  @Column()
  ville: string;

  @Column({ default: false })
  estApprouve: boolean;
  @Column()
  idUtilisateur: string;

  // 🔗 Relation avec User
  @OneToOne(() => User)
  @JoinColumn({ name: 'idUtilisateur', referencedColumnName: 'id' })
  utilisateur:User;

  @OneToMany(() => Avis, (avis) => avis.auteur)
  avis: Avis[];
    
  @OneToMany(() => Reclamation, (reclamation) => reclamation.utilisateur)
  reclamations: Reclamation[];
    
}