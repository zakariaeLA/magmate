import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity'; // adapte le chemin selon ton projet

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
  utilisateur: User;
}
