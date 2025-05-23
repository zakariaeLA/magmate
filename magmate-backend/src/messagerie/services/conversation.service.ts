import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, mergeMap, Observable, of, switchMap, take } from 'rxjs';
import { Repository, DeleteResult } from 'typeorm';
import { catchError } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

import { User } from '../../user/entities/user.entity';
import { ConversationEntity } from '../models/conversation.entity';
import { MessageEntity } from '../models/message.entity';
import { ActiveConversationEntity } from '../models/active-conversation.entity';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(ConversationEntity)
    private readonly conversationRepository: Repository<ConversationEntity>,
    @InjectRepository(ActiveConversationEntity)
    private readonly activeConversationRepository: Repository<ActiveConversationEntity>,
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  getConversation(
    creatorId: string,
    friendId: string,
  ): Observable<ConversationEntity | undefined> {
    return from(
      this.conversationRepository
        .createQueryBuilder('conversation')
        .leftJoin('conversation.users', 'user')
        .where('user.id = :creatorId', { creatorId })
        .orWhere('user.id = :friendId', { friendId })
        .groupBy('conversation.id')
        .having('COUNT(*) > 1')
        .getOne(),
    ).pipe(map((conversation) => conversation || undefined));
  }

  createConversation(creator: User, friend: User): Observable<ConversationEntity> {
    return this.getConversation(creator.id, friend.id).pipe(
      switchMap((conversation) => {
        if (!conversation) {
          const newConversation = this.conversationRepository.create({
            users: [creator, friend],
          });
          return from(this.conversationRepository.save(newConversation));
        }
        return of(conversation);
      }),
    );
  }

  getConversationsForUser(userId: string): Observable<ConversationEntity[]> {
    return from(
      this.conversationRepository
        .createQueryBuilder('conversation')
        .leftJoin('conversation.users', 'user')
        .where('user.id = :userId', { userId })
        .orderBy('conversation.lastUpdated', 'DESC')
        .getMany(),
    );
  }

  getUsersInConversation(conversationId: string): Observable<ConversationEntity[]> {
    return from(
      this.conversationRepository
        .createQueryBuilder('conversation')
        .innerJoinAndSelect('conversation.users', 'user')
        .where('conversation.id = :conversationId', { conversationId })
        .getMany(),
    );
  }

getConversationsWithUsers(userId: string): Observable<ConversationEntity[]> {
  return this.getConversationsForUser(userId).pipe(
    switchMap(conversations => 
      forkJoin(
        conversations.map(conv => 
          this.getUsersInConversation(conv.id).pipe(
            map(convsWithUsers => ({
              ...conv,
              users: convsWithUsers[0]?.users || []
            }))
          )
        )
      )
    )
  );
}

  joinConversation(
    conversationId: string,  // Changé de friendId à conversationId
    userId: string,
    socketId: string,
  ): Observable<ActiveConversationEntity | undefined> {
    return from(
      this.conversationRepository.findOne({ 
        where: { id: conversationId },
        relations: ['users']
      })
    ).pipe(
      switchMap((conversation) => {
        if (!conversation) {
          console.warn(`No conversation exists with id ${conversationId}`);
          return of(undefined);
        }
  
        return from(
          this.activeConversationRepository.findOne({ 
            where: { userId } 
          })
        ).pipe(
          switchMap((existingActiveConversation) => {
            const activeConversation = existingActiveConversation 
              ? this.activeConversationRepository.create({
                  ...existingActiveConversation,
                  socketId,
                  conversationId: conversation.id
                })
              : this.activeConversationRepository.create({
                  socketId,
                  userId,
                  conversationId: conversation.id
                });
  
            return from(this.activeConversationRepository.save(activeConversation));
          })
        );
      })
    );
  }

  leaveConversation(socketId: string): Observable<DeleteResult> {
    return from(this.activeConversationRepository.delete({ socketId }));
  }

  getActiveUsers(conversationId: string): Observable<ActiveConversationEntity[]> {
    return from(
      this.activeConversationRepository.find({
        where: { conversationId },
      }),
    );
  }

  createMessage(message: MessageEntity): Observable<MessageEntity> {
    // Initialiser les statuts
    message.delivered = false;
    message.read = false;
    return from(this.messageRepository.save(message));
  }

markMessagesAsDelivered(conversationId: string, userId: string): Observable<void> {
  return from(
    this.messageRepository.createQueryBuilder()
      .update(MessageEntity)
      .set({ delivered: true })
      .where('conversationId = :conversationId AND userId != :userId AND delivered = false', { 
        conversationId, 
        userId 
      })
      .execute()
  ).pipe(map(() => undefined));
}

markMessagesAsRead(conversationId: string, userId: string): Observable<void> {
  return from(
    this.messageRepository.createQueryBuilder()
      .update(MessageEntity)
      .set({ read: true })
      .where('conversationId = :conversationId AND userId != :userId AND read = false', { 
        conversationId, 
        userId 
      })
      .execute()
  ).pipe(map(() => undefined));
}


getUnreadCounts(userId: string): Observable<{ [conversationId: string]: number }> {
  return this.getConversationsForUser(userId).pipe(
    switchMap(conversations => 
      forkJoin(
        conversations.map(conv => 
          from(this.messageRepository.createQueryBuilder('message')
            .where('message.conversationId = :conversationId', { conversationId: conv.id })
            .andWhere('message.userId != :userId', { userId })
            .andWhere('message.read = false')
            .getCount()
          ).pipe(
            map(count => ({ conversationId: conv.id, count }))
          )
        )
      )
    ),
    map(results => 
      results.reduce((acc, { conversationId, count }) => {
        if (count > 0) acc[conversationId] = count;
        return acc;
      }, {} as { [conversationId: string]: number })
    )
  );
}

  getMessages(conversationId: string): Observable<MessageEntity[]> {
    return from(
      this.messageRepository
        .createQueryBuilder('message')
        .innerJoinAndSelect('message.user', 'user')
        .where('message.conversationId = :conversationId', { conversationId })
        .orderBy('message.createdAt', 'ASC')
        .getMany(),
    );
  }

  // Helper methods for development/testing only
  removeActiveConversations(): Observable<any> {
    return from(
      this.activeConversationRepository.createQueryBuilder().delete().execute(),
    );
  }

  removeMessages(): Observable<any> {
    return from(this.messageRepository.createQueryBuilder().delete().execute());
  }

  removeConversations(): Observable<any> {
    return from(
      this.conversationRepository.createQueryBuilder().delete().execute(),
    );
  }

  
}
