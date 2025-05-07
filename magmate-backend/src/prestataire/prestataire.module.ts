import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prestataire } from './entities/prestataire.entity';
import { User } from '../user/entities/user.entity';
import { PrestataireService } from './services/prestataire.service';
import { PrestataireController } from './controllers/prestataire.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Prestataire, User])],
  controllers: [PrestataireController],
  providers: [PrestataireService],
})
export class PrestataireModule {}