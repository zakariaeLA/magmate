import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Magasin } from './marketplace/entities/magasin.entity';
import { Produit } from './marketplace/entities/produit.entity';
import { Avis } from './marketplace/entities/avis.entity';
import { Image } from './marketplace/entities/image.entity';
import { Reclamation } from './marketplace/entities/reclamation.entity';
// data-source.ts
import UserRequestEntity from './user/entities/userrequest.entity'; // Import par défaut
import { ConversationEntity } from './messagerie/models/conversation.entity';
import { MessageEntity } from './messagerie/models/message.entity';
import { ActiveConversationEntity } from './messagerie/models/active-conversation.entity';
export default new DataSource({
  type: 'postgres',
  host: 'aws-0-eu-west-3.pooler.supabase.com',
  port: 5432,
  username: 'postgres.rszgdnwrwdciiujrzqla',
  password: '1234',
  database: 'postgres',
  entities: [
    User,
    Magasin,
    Produit,
    Avis,
    Reclamation,
    Image,
    UserRequestEntity,
    ConversationEntity,
    MessageEntity,
    ActiveConversationEntity
  ],
  migrations: ['src/migrations/*.ts'],
  ssl: true ? { 
    rejectUnauthorized: false 
  } : false,
});