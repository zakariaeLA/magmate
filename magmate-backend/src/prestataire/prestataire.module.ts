import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prestataire } from './entities/prestataire.entity';

import { PrestataireController } from './controllers/detailsprestataire.controller';
import { PrestataireService } from './services/prestatairedetails.service';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prestataire, User])],
  controllers: [PrestataireController],
  providers: [PrestataireService],
  exports: [PrestataireService],
})
export class PrestatairesModule {}