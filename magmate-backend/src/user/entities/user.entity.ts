import {  avisprestataire } from 'src/prestataire/entities/avisprestataire.entity';
import { Reclamationprestataire } from 'src/prestataire/entities/reclamationprestataire.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { Prestataire } from 'src/prestataire/entities/prestataire.entity';

enum UserRole {
  ADMIN = 'admin',
  NORMAL_USER = 'normal_user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  password?: string | null;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.NORMAL_USER })
  role: UserRole;

  @Column()
  fname: string;

  @Column()
  lname: string;

  @Column({ nullable: true })
  photo?: string;

  @Column({ name: 'registration_date', default: () => 'CURRENT_TIMESTAMP' })
  registrationDate: Date;

  // 🔗 Relation OneToOne avec Prestataire
  @OneToOne(() => Prestataire, (prestataire) => prestataire.utilisateur, { nullable: true })
  prestataire?: Prestataire | null;

  @OneToMany(() => avisprestataire, (avis) => avis.auteur)
  avis: avisprestataire[];


  @OneToMany(() => Reclamationprestataire, (reclamation) => reclamation.utilisateur)
  reclamations: Reclamationprestataire[];
}
