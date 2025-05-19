import { User } from '../../user/entities/user.entity';
import {
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  PrimaryColumn
} from 'typeorm';
import { MessageEntity } from './message.entity';

// Interface définissant le type Conversation
export interface IConversation {
  id?: string;
  users?: User[];
  lastUpdated?: Date;
}

@Entity('conversation')
export class ConversationEntity implements IConversation {
  @PrimaryGeneratedColumn('uuid') // Changez pour UUID
  id: string; // Devient string

  @ManyToMany(() => User, user => user.conversations)
  @JoinTable()
  users: User[];

  @OneToMany(() => MessageEntity, (messageEntity) => messageEntity.conversation)
  messages: MessageEntity[];

  @UpdateDateColumn()
  lastUpdated: Date;
}