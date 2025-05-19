import { Column, Entity, ManyToOne, PrimaryGeneratedColumn ,PrimaryColumn} from 'typeorm';
import { User } from './user.entity';

// ✅ Enum de statut
export enum UserRequestStatus {
  NOT_SENT = 'not-sent',
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
  WAITING_FOR_CURRENT_USER_RESPONSE = 'waiting-for-current-user-response',
}

@Entity('request')
export class UserRequestEntity {
  @PrimaryColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.sentUserRequests)
  creator: User;

  @ManyToOne(() => User, (user) => user.receivedUserRequests)
  receiver: User;

  @Column({ type: 'enum', enum: UserRequestStatus, default: UserRequestStatus.NOT_SENT })
  status: UserRequestStatus;
}



export default UserRequestEntity;