import { Entity, Column, PrimaryGeneratedColumn , OneToMany } from 'typeorm';
import { Avis } from 'src/marketplace/entities/avis.entity';
import { Reclamation } from 'src/marketplace/entities/reclamation.entity';
import { Magasin } from 'src/marketplace/entities/magasin.entity';
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

  @Column({ type: 'varchar',nullable: true })
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

  @OneToMany(() => Avis, (avis) => avis.auteur)
    avis: Avis[];
  
    @OneToMany(() => Reclamation, (reclamation) => reclamation.utilisateur)
    reclamations: Reclamation[];
  
    @OneToMany(() => Magasin, (magasin) => magasin.proprietaire)
    magasins: Magasin[];
}
