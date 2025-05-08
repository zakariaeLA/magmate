import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prestataire } from './entities/prestataire.entity';
import { PrestatairedetailsController } from './controllers/detailsprestataire.controller';
import { PrestatairedetailsService } from './services/prestatairedetails.service';
import { User } from '../user/entities/user.entity';
import { PrestataireController } from './controllers/prestataire.controller';
import { PrestataireService } from './services/prestataire.service';


@Module({
  controllers: [PrestataireController, PrestatairedetailsController],
  providers: [PrestataireService, PrestatairedetailsService],
  imports: [TypeOrmModule.forFeature([Prestataire])],
  exports: [TypeOrmModule],
})
export class PrestataireModule {}


