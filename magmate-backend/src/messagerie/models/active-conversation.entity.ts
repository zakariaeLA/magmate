import { Column, Entity, PrimaryColumn,PrimaryGeneratedColumn } from 'typeorm';

export interface ActiveConversation {
  id?: string;  // Changé en string
  socketId?: string;
  userId?: string;
  conversationId?: string;  // Changé en string
}

@Entity('active_conversation')
export class ActiveConversationEntity implements ActiveConversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  socketId: string;

  @Column({ type: 'uuid' })
  userId: string;  // Doit correspondre au type User.id

  @Column({ type: 'uuid' })  // Doit correspondre à ConversationEntity.id
  conversationId: string;
}