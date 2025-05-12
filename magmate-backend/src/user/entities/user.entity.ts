import { Favorite } from 'src/events/entities/favorite.entity';

import { Event } from 'src/events/entities/event.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
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

  @OneToMany(() => Event, (event) => event.createdBy)
  events: Event[];

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];
}
