import { Entity, Column, PrimaryGeneratedColumn,OneToMany,ManyToMany  } from 'typeorm';

import { Avis } from '../../marketplace/entities/avis.entity';
import { Reclamation } from '../../marketplace/entities/reclamation.entity';
import { Magasin } from '../../marketplace/entities/magasin.entity';
import { UserRequestEntity } from './userrequest.entity';
import { ConversationEntity } from '../../messagerie/models/conversation.entity';
import { MessageEntity } from '../../messagerie/models/message.entity';
enum UserRole {
  ADMIN = 'admin',
  NORMAL_USER = 'normal_user',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
/*
  @Column({ unique: true, nullable: true })
  firebaseUid: string; // Ajoutez cette ligne

*/
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
  
    @OneToMany(
      () => UserRequestEntity,
      (userRequest) => userRequest.creator,
    )
    sentUserRequests: UserRequestEntity[];
  
    @OneToMany(
      () => UserRequestEntity,
      (userRequest) => userRequest.receiver,
    )
    receivedUserRequests: UserRequestEntity[];

    @ManyToMany(
      () => ConversationEntity,
      (conversationEntity) => conversationEntity.users,
    )
    conversations: ConversationEntity[];
  
    @OneToMany(() => MessageEntity, (messageEntity) => messageEntity.user)
    messages: MessageEntity[];
    
  }
