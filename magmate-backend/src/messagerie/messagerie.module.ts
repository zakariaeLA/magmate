import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { MessagerieGateway } from './gateway/messagerie/messagerie.gateway';
import { ActiveConversationEntity } from './models/active-conversation.entity';
import { ConversationEntity } from './models/conversation.entity';
import { MessageEntity } from './models/message.entity';
import { ConversationService } from './services/conversation.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      ConversationEntity,
      ActiveConversationEntity,
      MessageEntity,
    ]),
  ],
  providers: [MessagerieGateway, ConversationService],
})
export class MessagerieModule {}