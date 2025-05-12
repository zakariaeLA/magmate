import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { avisprestataire } from './avisprestataire.entity';
import { Reclamationprestataire } from './reclamationprestataire.entity';

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

  @Column({ nullable: false })
  idUtilisateur: string;

  // Relation OneToOne avec User
  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'idUtilisateur', referencedColumnName: 'id' })
  utilisateur: User;

  @OneToMany(() => avisprestataire, (avis) => avis.prestataire)
  avis: avisprestataire[];

  @OneToMany(
    () => Reclamationprestataire,
    (reclamation) => reclamation.prestataire,
  )
  reclamations: Reclamationprestataire[];
}
